import { defineEventHandler, readBody, setCookie } from 'h3'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: process.env.UserPoolId || '',
  ClientId: process.env.ClientId || '',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: body.data.email,
        Password: body.data.password,
    });
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: body.data.email,
        Pool: userPool
    });
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            const userName = `${result.getIdToken().payload.given_name}`
            const expirationTime = new Date(result.getAccessToken().payload.exp * 1000)
            const auth = {
                jwt: result.getAccessToken().getJwtToken(),
                jwt_expired: expirationTime,
                email: body.data.email,
                given_name: userName
            }
            setCookie(event, 'token', result.getRefreshToken().getToken(), {
                expires: new Date(result.getAccessToken().payload.auth_time * 1000 + 1000 * 60 * 60 * 24 * 30),
                httpOnly: true
            })
            resolve(auth);
        },
        onFailure: function(err) {
            if (err) {
                try {
                    err.message = err.message;
                    resolve({
                        error: err,
                        message: err.message
                    });
                } catch (err) {
                    console.log(err);
                    console.log(err.message);
                    resolve({ statusCode: 500 })
                }
            }
        },
    });
  })
})
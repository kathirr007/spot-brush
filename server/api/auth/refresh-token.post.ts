import { defineEventHandler, readBody, setCookie } from 'h3'
import cookie from 'cookie'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: process.env.UserPoolId,
  ClientId: process.env.ClientId,
})

export default defineEventHandler(async (event) => {
  const headers = event.node.req.headers
  const parsed = headers.cookie ? cookie.parse(headers.cookie) : {}
  const refreshTokenValue = parsed.token
  
  if (!refreshTokenValue) {
    return { statusCode: 401, message: 'Missing auth cookie' }
  }
  
  return new Promise((resolve) => {
    const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: refreshTokenValue});
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username : '',
      Pool : userPool
    });

    cognitoUser.refreshSession(refreshToken, (err, result) => {
      if (err) {
        resolve({ statusCode: 401, message: 'The Access Token expired' })
      } else {
        const userName = `${result.getIdToken().payload.given_name}`
        const expirationTime = new Date(result.getAccessToken().payload.exp*1000)
        const auth = {
            jwt: result.getIdToken().getJwtToken(),
            jwt_expired: expirationTime,
            email: result.getIdToken().payload.email,
            refresh_token: result.getRefreshToken().getToken(),
            refresh_token_expired: new Date(result.getIdToken().payload.auth_time * 1000 + 1000*60*60*24*30),
            given_name: userName,
          }
        setCookie(event, 'token', result.getRefreshToken().getToken(), {
          expires: new Date(result.getAccessToken().payload.auth_time * 1000 + 1000*60*60*24*30),
          httpOnly: true })
        resolve(auth);
      }
    })
  })
})
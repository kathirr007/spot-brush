import { defineEventHandler, readBody, setCookie } from 'h3'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: process.env.UserPoolId || '',
  ClientId: process.env.ClientId || '',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  return new Promise((resolve, reject) => {
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({Name: "given_name", Value: body.firstName}),
      new AmazonCognitoIdentity.CognitoUserAttribute({Name: "family_name", Value: body.lastName}),
    ]

    userPool.signUp(body.email, body.password, attributeList, [], function(err: any, result: any){
        if (err) {
          try {
            err.message = err.message;
            resolve({ error: err })
          } catch (err) {
            console.log(err);
            resolve({ statusCode: 500 })
          }
        }
        const cognitoUser = result.user;
        resolve({user: cognitoUser.getUsername()});
    });
  })
})
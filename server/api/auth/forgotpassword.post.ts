import { defineEventHandler, readBody } from 'h3'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: process.env.UserPoolId,
  ClientId: process.env.ClientId,
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  return new Promise((resolve) => {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username : body.email,
      Pool : userPool
    });

    cognitoUser.forgotPassword({
        onSuccess: function(result) {
            resolve({ message: 'Success' });
        },
        onFailure: function(err) {
            resolve({ message: err })
        }
    });
  })
})
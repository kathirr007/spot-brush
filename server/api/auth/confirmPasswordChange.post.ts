import { defineEventHandler, readBody } from 'h3'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: process.env.UserPoolId,
  ClientId: process.env.ClientId,
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  return new Promise((resolve) => {
    const confirmationDetails = {
        verificationCode: body.verificationCode,
        newPassword: body.newPassword,
    }

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username : body.email,
      Pool : userPool
    });

    cognitoUser.confirmPassword(body.verificationCode, body.newPassword, {
        onFailure(err) {
            console.log(err.message)
            resolve({ message: err.message })
        },
        onSuccess() {
            console.log('Password has been changed/updated successfully.')
            resolve({ message: 'Password has been changed/updated successfully.' })
        },
    });
  })
})
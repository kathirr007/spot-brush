const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
const cognitoConfig = require("../../cognito-config.json");

var poolData = {
  UserPoolId: cognitoConfig.cognito.USER_POOL_ID,
  ClientId: cognitoConfig.cognito.APP_CLIENT_ID,
};

const pool_region = "us-east-1";

exports.Validate = function (req, res, next) {
  var token = req.headers['authorization'].split(' ')[1]
  // const wid = req["query"]["wid"];
  // const token = req["query"]["at"];
  // console.log(req["query"]);
  request(
    {
      url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        pems = {};
        var keys = body["keys"];
        for (var i = 0; i < keys.length; i++) {
          var key_id = keys[i].kid;
          var modulus = keys[i].n;
          var exponent = keys[i].e;
          var key_type = keys[i].kty;
          var jwk = { kty: key_type, n: modulus, e: exponent };
          var pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        var decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) {
          console.log("Not a valid JWT token");
          res.status(401);
          return res.send("Invalid token");
        }
        var kid = decodedJwt.header.kid;
        var pem = pems[kid];
        if (!pem) {
          console.log("Invalid token");
          res.status(401);
          return res.send("Invalid token");
        }
        jwt.verify(token, pem, function (err, payload) {
          if (err) {
            console.log("Invalid Token.");
            res.status(401);
            return res.send("Invalid tokern");
          } else {
            console.log("Valid Token.");
            //  res.send(token);
            // return res.send(token);
            next();
          }
        });
      } else {
        console.log("Error! Unable to download JWKs");
        res.status(500);
        return res.send("Error! Unable to download JWKs");
      }
    }
  );
};

exports.Validate2 = function (token, callback) {
  //}, callback){
  var isValid = false;
  // token = "eyJraWQiOiIzWks5T2tXY1wvTGQxUlN6ZkU1Q21TSk1lQ1IzbG5VOGdLa1BDSnI2Mkx5Yz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNDA4YWJjZC1kNjEyLTRmNmQtOTUwYS03Zjc1ZTIyMjE2NDciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfSGF5eUdicDBPIiwiY29nbml0bzp1c2VybmFtZSI6ImQ0MDhhYmNkLWQ2MTItNGY2ZC05NTBhLTdmNzVlMjIyMTY0NyIsImdpdmVuX25hbWUiOiJLYXRoaXJyMDA3IiwiYXVkIjoiN2pjdHRpaXJub3Q0Y21kYXM3MHQ4cTJrc3QiLCJldmVudF9pZCI6IjMzMDA3MzMxLWQ3YTctNGZkNC1hYzNhLTQwNDEyZmZlMDZhOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk4OTAyNTA2LCJleHAiOjE1OTg5MzAwODAsImlhdCI6MTU5ODkyNjQ4MCwiZmFtaWx5X25hbWUiOiJLIiwiZW1haWwiOiJrYXRoaXJyMDA3QGdtYWlsLmNvbSJ9.IlGGQqP7D7qsXnD9vZOARiCUQJYoLToJ9fSB_o9TJlcIBYdtwCnpe90oI-KOiDGsUHTEPkGdupgzg6u7nF771DHvaqrVa4PVtBRjAwn6hmJOUhCpyuniCrNZG_o2pnVfjML-oC1-191hqBVvdH9xpytv1pmz7AUM8ubN-FcK2VrhOEHte8a6slfUUtNnyO0xV5vINTQTk45CHICFkQ-h2AqE6fXRa-H7-CL746wP9zIYdxW0mtIU4GlHS0he03UIJNCQYfNK70FJjR0OBvQcnFJCh1LJBOGqZZSdDz5Shfil3XYEg2YQhRdbYUL20a-QrmHUWPXXqYZpMhKj2d2rGQ"
  request(
    {
      url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        pems = {};
        var keys = body["keys"];
        for (var i = 0; i < keys.length; i++) {
          var key_id = keys[i].kid;
          var modulus = keys[i].n;
          var exponent = keys[i].e;
          var key_type = keys[i].kty;
          var jwk = { kty: key_type, n: modulus, e: exponent };
          var pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        var decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) {
          console.log("Not a valid JWT token");
          //  return false;
          callback(new Error("Not a valid JWT token"));
          return;
        }
        var kid = decodedJwt.header.kid;
        var pem = pems[kid];
        if (!pem) {
          console.log("Invalid token");
          //  return;
          callback(new Error("Invalid token"));
          return;
        }
        jwt.verify(token, pem, function (err, payload) {
          if (err) {
            console.log("Invalid Token.");
            //  return;
            callback(new Error("Invalid token"));
            return;
          } else {
            console.log("Valid Token.");
            callback(null, "Valid token");
            return;
          }
        });
      } else {
        console.log("Error! Unable to download JWKs");
        callback(error);
        return;
      }
    }
  );
};

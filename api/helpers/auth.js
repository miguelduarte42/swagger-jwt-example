"use strict";

var jwt = require("jsonwebtoken");
var sharedSecret = "shh";
var issuer = "my-awesome-website.com";

//Here we setup the security checks for the endpoints
//that need it (in our case, only /protected). This
//function will be called every time a request to a protected
//endpoint is received
exports.verifyToken = function(req, authOrSecDef, token, callback) {
  //these are the scopes/roles defined for the current endpoint
  var currentScopes = req.swagger.operation["x-security-scopes"];

  function sendError() {
    return req.res.status(403).json({ message: "Error: Access Denied" });
  }

  //validate the 'Authorization' header. it should have the following format:
  //'Bearer tokenString'
  if (token && token.indexOf("Bearer ") == 0) {
    var tokenString = token.split(" ")[1];

    jwt.verify(tokenString, sharedSecret, function(
      verificationError,
      decodedToken
    ) {
      //check if the JWT was verified correctly
      if (
        verificationError == null &&
        Array.isArray(currentScopes) &&
        decodedToken &&
        decodedToken.role
      ) {
        // check if the role is valid for this endpoint
        var roleMatch = currentScopes.indexOf(decodedToken.role) !== -1;
        // check if the issuer matches
        var issuerMatch = decodedToken.iss == issuer;

        // you can add more verification checks for the
        // token here if necessary, such as checking if
        // the username belongs to an active user

        if (roleMatch && issuerMatch) {
          //add the token to the request so that we
          //can access it in the endpoint code if necessary
          req.auth = decodedToken;
          //if there is no error, just return null in the callback
          return callback(null);
        } else {
          //return the error in the callback if there is one
          return callback(sendError());
        }
      } else {
        //return the error in the callback if the JWT was not verified
        return callback(sendError());
      }
    });
  } else {
    //return the error in the callback if the Authorization header doesn't have the correct format
    return callback(sendError());
  }
};

exports.issueToken = function(username, role) {
  var token = jwt.sign(
    {
      sub: username,
      iss: issuer,
      role: role
    },
    sharedSecret
  );
  return token;
};

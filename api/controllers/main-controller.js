var auth = require("../helpers/auth");

exports.unprotectedGet = function(args, res, next) {
  var response = { message: "My resource!" };
  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(response));
};

exports.protectedGet = function(args, res, next) {
  var response = { message: "My protected resource for admins and users!" };
  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(response));
};

exports.protected2Get = function(args, res, next) {
  var response = { message: "My protected resource for admins!" };
  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(response));
};

exports.loginPost = function(args, res, next) {
  var role = args.swagger.params.role.value;
  var username = args.body.username;
  var password = args.body.password;

  if (role != "user" && role != "admin") {
    var response = { message: 'Error: Role must be either "admin" or "user"' };
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  }

  if (username == "username" && password == "password" && role) {
    var tokenString = auth.issueToken(username, role);
    var response = { token: tokenString };
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  } else {
    var response = { message: "Error: Credentials incorrect" };
    res.writeHead(403, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  }
};

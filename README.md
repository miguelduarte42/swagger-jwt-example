## Swagger JWT Example

Minimal working example of how to integrate JWT with Swagger using Node.js. You can read the full post on my blog: [http://miguelduarte.pt/2017/04/19/using-jwt-authentication-with-swagger-and-node-js/](http://miguelduarte.pt/2017/04/19/using-jwt-authentication-with-swagger-and-node-js/)

## How to run this
 
1) Start the server by running `npm start`

2) Check the swagger-ui on `http://localhost:3000/docs`

3) GET `http://localhost:3000/api/unprotected` should work

4) GET `http://localhost:3000/api/protected` should NOT work

5) POST `http://localhost:3000/api/login/user` with the following body
``
{
"username": "username",
"password": "password"
}
``
 and take the token that you get in the response
 
 6) GET `http://localhost:3000/api/protected` again with the following header
 ``Authorization: Bearer _TOKEN_``, replacing `_TOKEN_ ` with the value you got from request #4
  
 Then you can try logging in as an admin and accessing the admin-only route.

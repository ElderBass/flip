const express = require("express");
const app = express();
const usersController = require('../../controller/user');

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.route('/signup').post(usersController.addUser);
app.route('/login').post(usersController.loginUser);
// app.route("/:id").get(usersController.getOneUser);;

module.exports = app;

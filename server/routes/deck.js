const express = require("express");
const app = express();
const deckController = require('../../controller/deck');

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.route("/all").get(deckController.getAlldeck);
app.route("/create").post(deckController.createPost);

module.exports = app;

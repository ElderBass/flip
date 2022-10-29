const express = require("express");
const app = express();
const { getAllDecks, createDeck } = require('../controller/deck');

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

app.route('/all').get(getAllDecks);
app.route('/create').post(createDeck);

module.exports = app;

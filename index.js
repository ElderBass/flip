const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const UserRoutes = require("./routes/user");
const DeckRoutes = require("./routes/deck");

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

app.use(UserRoutes);
app.use(DeckRoutes);

const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("\n error = ", err, "\n"));

app.listen(PORT, function () {
  console.log(
    `🌎  ==> API Server now listening on PORT http://localhost:${PORT} !`
  );
});

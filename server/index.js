const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);


mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/flip", {
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('\n error = ', err, '\n'));


app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT http://localhost:${PORT} !`);
});

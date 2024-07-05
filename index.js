const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const UserRoutes = require('./routes/user');
const DeckRoutes = require('./routes/deck');
const { init } = require('./socket');

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(UserRoutes);
app.use(DeckRoutes);

app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, './client/build/index.html'))
);

const MONGO_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGO_URI, { useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log('\n error connecting to MongoDB = ', err, '\n'));

const server = http.createServer(app).listen(PORT);

try {
    init(server, process.env.PORT);
} catch (err) {
    console.log('\n error initializing socket server: ', err, '\n');
}

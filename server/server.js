const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const databaseController = require('./controllers/databaseController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.resolve(__dirname, '../client/assets')));
app.get('/', (res, req) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
});
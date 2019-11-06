const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const databaseController = require('./controllers/databaseController');

app.use(bodyParser.json());
app.use(cookieParser());
// get questions request 
app.get('/questions', databaseController.getQuestions, (req, res) => {
    res.json(res.locals.qsAndAs);
});

// post answers request
// app.post('/results', databaseController.insertResults, (req, res) => {

// });

app.post('/register', authController.createUser, authController.setCookie, authController.setSession, (req, res) => {
    // sending back username, email
    res.json(res.locals.userData);
    // maybe res.redirect('/mainpage');
});

// send back game history
app.post('/login', authController.verifyUser, authController.setCookie, authController.setSession, (req, res) => {
    if(res.locals.isValidUser) {
        res.status(200).json(res.locals.userData)
    } else {
        res.status(201).json(res.locals.userData);
    }
});

app.get('/verify', authController.verifySession, (req, res) => {
    res.json(res.locals.verifyUser);
});

app.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('*', (req, res, next) => {
    res.status(404).send('File is not found, Route is wrong')
});

app.use((error, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        message: 'Error in server occurred'
    }
    const errorObj = Object.assign(defaultErr, error);
    console.error(defaultErr.log);
    res.status(500).send(errorObj.message)
});

app.listen(PORT, () => {
    console.log(`Listening port ${PORT} ^0^`);
});
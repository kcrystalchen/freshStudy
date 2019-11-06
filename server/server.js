const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const databaseController = require('./controllers/databaseController');

app.use(bodyParser.json());

// get questions request 
app.get('/questions', databaseController.getQuestions, (req, res) => {
  res.json(res.locals.qsAndAs);
});

// post answers request
// app.post('/results', databaseController.insertResults, (req, res) => {

// });

app.post('/register', authController.createUser, (req, res) => {
    // sending back username, email
    res.json(res.locals.newUser);
});

// send back game history
app.post('/login', authController.verifyUser, (req, res) => {
    res.json(res.locals.isValidUser);
})

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

io.on('connection', socket => {
  console.log('user connected');
  io.emit('message', 'hello');
  socket.on('answer', data => {
    console.log(data);
  });
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

http.listen(PORT, () => {
    console.log(`Listening port ${PORT} ^0^`);
});

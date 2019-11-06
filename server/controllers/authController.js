const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const cookieParser = require('cookie-parser');


// set uuidv4 cookie
const setCookie = (req, res, next) => {
    res.locals.sessionId = uuidv4();
    console.log('res.locals.sessionId in authController', res.locals.sessionId);
    res.cookie('ssid', res.locals.sessionId, { httpOnly: false });
    return next();
}


module.exports = {
}
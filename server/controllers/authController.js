const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const cookieParser = require('cookie-parser');
const pool = require('../models/databaseModel');



const createUser = (req, res, next) => {
    const { username, password, email } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next({ log: `Error in generating salt password, ${err}`, message: `Could not save password` });
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return next({ log: `Error in hashing password, ${err}`, message: `Could not save password` });
            }
            const queryText = `INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
            const values = [username, email, hash];
            pool.query(queryText, values, (err, response) => {
                if (err) {
                    return next({ log: `Error saving new user data, ${err}`, message: `Could not save password` });
                }
                console.log('createUser res.locals info', response.rows[0]);
                const { id, username, email } = response.rows[0];
                res.locals.newUser = { id, username, email };
                return next();
            })
        })
    })
};


const verifyUser = (req, res, next) => {
    console.log("verifyUser req.body in middleware", req.body);
    const { username, password } = req.body;
    const queryText = `SELECT password FROM "Users" WHERE username=$1`;
    const value = [username];
    pool.query(queryText, value, (err, dbResponse) => {
        if (err) {
            return next({ log: `Error in verifying user, getting user data, ${err}`, message: `Could not verify password` })
        }
        const hash = dbResponse.rows[0].password;
        console.log("hash", username)
        bcrypt.compare(password, hash, (err, isValidUser) => {
            if (err) {
                return next({ log: `Error in verifying user, ${err}`, message: `Could not verify password` })
            }
            res.locals.isValidUser = isValidUser;
            console.log("ValidUser in middleware", res.locals.isValidUser);
            return next();
        })
    })
};

// setup uuidv4 cookie
const setCookie = (req, res, next) => {
    res.locals.sessionId = uuidv4();
    console.log('Middleware setCookie res.locals.sessionId ', res.locals.sessionId);
    res.cookie('ssid', res.locals.sessionId, { httpOnly: true, expires: new Date(Date.now() + 90000) });
    return next();
};


// create a session middleware
const setSession = (req, res, next) => {
    console.log('Middleware setsession res.locals.sessionId', res.locals.sessionId);

    const user_id = res.locals.newUser["id"];
    const session_id = res.locals.sessionId;

    const queryForInsertSession = `INSERT INTO "Sessions" ("user_id", "session_id") VALUES ($1, $2);`;

    pool.query(queryForInsertSession, [user_id, session_id], (error, results) => {
        if (error) {
            console.log("error Insert Session table", error);
            return next(error);
        }
        console.log("Insert session table no error");
        return next();
    });
};


// verify a session middleware
const verifySession = (req, res, next) => {

    const userCookiesFromBrowser = req.cookies["ssid"];

    console.log("Middleware verifySession req.cookies", userCookiesFromBrowser);

    if (userCookiesFromBrowser === undefined || userCookiesFromBrowser === null) {
        res.locals.verifyUser = false;
        return next();
    }

    const querySessions = `SELECT * FROM "Sessions" where session_id = $1`;

    pool.query(querySessions, [userCookiesFromBrowser], (error, responses) => {
        if (error) {
            return next(error);
        }
        console.log("sessionId from database", responses.rows[0]["session_id"], responses.rows[0]["user_id"]);
        const session_IdFromDatabase = responses.rows[0]["session_id"];

        // console.log("From Sessions table userId", user_idFromSessionTable, "session_id", session_idFromSessionTable);

        if (userCookiesFromBrowser === session_IdFromDatabase) {

            const userInfoFromDatabase = `SELECT * FROM "Users" WHERE id = (SELECT "user_id" from "Sessions" WHERE "session_id" = $1)`

            pool.query(userInfoFromDatabase, [session_IdFromDatabase], (error, responses) => {
                if (error) {
                    return next(error);
                }
                res.locals.verifyUser = responses.rows[0];
                return next();
            })
        } else {
            res.locals.verifyUser = false;
            console.log("verifySession error from middleware");
            return next();
        }
    });
};


module.exports = {
    createUser,
    verifyUser,
    setCookie,
    setSession,
    verifySession,
    // sessionCheck
};
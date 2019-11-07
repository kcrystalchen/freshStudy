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
                const { id, username, email } = response.rows[0];
                res.locals.userData = { id, username, email };
                return next();
            })
        })
    })
};


const verifyUser = (req, res, next) => {
    const { username, password } = req.body;
    const queryText = `SELECT * FROM "Users" WHERE username=$1`;
    const value = [username];
    pool.query(queryText, value, (err, dbResponse) => {
        if(err) {
            return next({log: `Error in verifying user, getting user data, ${err}`, message: `Could not verify password`})
        }
        // when input username is not found, rows should be empty array
        res.locals.userData = false;
        if(dbResponse.rows.length === 0) {
            return next();
        }
        const hash = dbResponse.rows[0].password;
        const { id, username, email } = dbResponse.rows[0];
        bcrypt.compare(password, hash, (err, isValidUser) => {
            if (err) {
                return next({ log: `Error in verifying user, ${err}`, message: `Could not verify password` })
            }
            if(isValidUser) {
                res.locals.userData = { id, username, email };
                console.log("ValidUser in middleware", isValidUser);
            }
            return next();
        })
    })   
};

// setup uuidv4 cookie
const setCookie = (req, res, next) => {
    if(res.locals.userData) {
        res.locals.sessionId = uuidv4();
        console.log('Middleware setCookie res.locals.sessionId ', res.locals.sessionId);
        res.cookie('ssid', res.locals.sessionId, { httpOnly: true, expires: new Date(Date.now() + 259200000) });
    }
    return next();
};


// create a session middleware
const setSession = (req, res, next) => {
    console.log('Middleware setsession res.locals.sessionId', res.locals.sessionId);
    if(!res.locals.sessionId) {
        return next();
    }
    const userId = res.locals.userData.id;
    const sessionId = res.locals.sessionId;
    const queryForInsertSession = `INSERT INTO "Sessions" ("user_id", "session_id") VALUES ($1, $2);`;
    
    pool.query(queryForInsertSession, [userId, sessionId], (error, results) => {
        if (error) {
            return next({log: `Error inserting new Session data ${error}`, message: `Error creating session`});
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

    const queryText = `SELECT * FROM "Sessions" WHERE session_id = $1`;

    pool.query(queryText, [userCookiesFromBrowser], (error, dbResponse) => {
        if (error) {
            return next({log: `Error in verifySession, query DB for session, ${error}`, message: `Error in login`});
        }
        const dbResArray = dbResponse.rows;
        res.locals.verifyUser = false;
        console.log("sessionId from database", dbResArray);
        if(dbResArray.length === 0) {
            return next();
        }
        const userId = dbResArray[0]["user_id"];
        const session_IdFromDatabase = dbResArray[0]["session_id"];

        if (userCookiesFromBrowser === session_IdFromDatabase) {

            const userInfoFromDatabase = `SELECT * FROM "Users" WHERE id = $1`

            pool.query(userInfoFromDatabase, [userId], (error, response) => {
                if (error) {
                    return next({log: `Error in verifySession, query DB for users with sessionId, ${error}`, message: `Error in login`});
                }
                const { id, email, username } = response.rows[0];
                res.locals.verifyUser = { id, username, email };
                return next();
            })
        } 
    });
};

const deleteSession = (req, res, next) => {
    const { ssid } = req.cookies;
    const queryText = 'DELETE FROM "Sessions" WHERE session_id=$1';
    pool.query(queryText, [ssid], (error, dbResponse) => {
        if(error) {
            return next({log: `Error in deleting session, ${error}`, message: `Error logging out`})
        }
        console.log('in deleteSession middleware', dbResponse);
        return next();
    })
}


module.exports = {
    createUser,
    verifyUser,
    setCookie,
    setSession,
    verifySession,
    deleteSession
    // sessionCheck
};
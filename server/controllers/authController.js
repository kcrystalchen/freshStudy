const pool = require('../models/databaseModel');
const bcrypt = require('bcryptjs');

module.exports = {
  createUser(req, res, next) {
    const { username, password, email } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next({log: `Error in generating salt password, ${err}`, message: `Could not save password`});
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return next({log: `Error in hashing password, ${err}`, message: `Could not save password`});
        }
        const queryText = `INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
        const values = [username, email, hash];
        pool.query(queryText, values, (err, response) => {
          if (err) {
            return next({log: `Error saving new user data, ${err}`, message: `Could not save password`});
          }
          const { username, email } = response.rows[0];
          res.locals.newUser = { username, email };
          return next();
        })
      })
    })
  },
  verifyUser(req, res, next) {
    const { username, password } = req.body;
    const queryText = `SELECT password FROM "Users" WHERE username=$1`;
    const value = [username]
    pool.query(queryText, value, (err, dbResponse) => {
      if(err) {
        return next({log: `Error in verifying user, getting user data, ${err}`, message: `Could not verify password`})
      }
      const hash = dbResponse.rows[0].password;
      bcrypt.compare(password, hash, (err, isValidUser) => {
        if(err) {
          return next({log: `Error in verifying user, ${err}`, message: `Could not verify password`})
        }
        res.locals.isValidUser = isValidUser;
        return next();
      })
    })
  }
}
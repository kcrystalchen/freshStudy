const pool = require('../models/databaseModel');

module.exports = {
  getQuestions(req, res, next) {
    const queryText = `SELECT * FROM QsAndAs`;
    pool.query(queryText)
      .then(data => {
        res.locals.qsAndAs = data.rows;
        next();
      })
      .catch(err => {
        next({ log: `Error in getting questions, ${err}`, message: `Server could not get questions` });
      })
  }
}
require('dotenv').config();

console.log(process.env.DB_USER)

const { Pool, Client } = require('pg');
const connectionString = '';

const pool = new Pool({
  connectionString: connectionString
});

const queryString = `CREATE TABLE "QsAndAs" (
	"id" serial NOT NULL,
	"question" VARCHAR(255) NOT NULL,
	"ans_correct" VARCHAR(255) NOT NULL,
	"ans_one" VARCHAR(255) NOT NULL,
	"ans_two" VARCHAR(255),
	"ans_three" VARCHAR(255),
	CONSTRAINT "QsAndAs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);`

pool.query(queryString)
  .then(data => console.log('successfully created table'))
  .catch(e => console.error('table not created', e))

module.exports = pool;
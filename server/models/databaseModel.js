require('dotenv').config();

const { Pool, Client } = require('pg');
const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString: connectionString
});

const queryString = `
  CREATE TABLE IF NOT EXISTS "QsAndAs" (
    "id" serial NOT NULL,
    "topic" VARCHAR(255) NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "ans_correct" VARCHAR(255) NOT NULL,
    "ans_one" VARCHAR(255) NOT NULL,
    "ans_two" VARCHAR(255),
    "ans_three" VARCHAR(255),
    CONSTRAINT "QsAndAs_pk" PRIMARY KEY ("id")
  );
  CREATE TABLE IF NOT EXISTS "Users" (
    "id" serial NOT NULL, 
    "username" VARCHAR(255) NOT NULL, 
    "email" VARCHAR(255) NOT NULL, 
    "password" VARCHAR(255) NOT NULL, 
    CONSTRAINT "Users_pk" PRIMARY KEY ("id")
  );
  CREATE TABLE IF NOT EXISTS "Sessions" (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "cookie_id" varchar(255) NOT NULL,
    CONSTRAINT "Sessions_pk" PRIMARY KEY ("id")
  );
  `
  // ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");

pool.query(queryString)
  .then(data => console.log('successfully created table'))
  .catch(e => console.error('table not created', e))

module.exports = pool;
const { Pool, Client } = require('pg');
const connectionString = '';

const pool = new Pool({
  connectionString: connectionString
});


const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

pool.on('error', (err) => {
  console.error('Unexpected DB error:', err);
});

// Set default schema on every new connection
pool.on('connect', async (client) => {
  const schema = process.env.DB_SCHEMA || 'drugapp';

  await client.query(`SET search_path TO ${schema}`);

  console.log(`Connected using schema: ${schema}`);
});

module.exports = pool;

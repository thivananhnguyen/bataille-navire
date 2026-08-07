const { Pool } = require('pg');
const { getEnv } = require('../config/env');

const env = getEnv();

const pool = new Pool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL client error:', error.message);
});

module.exports = pool;

const { Pool } = require('pg');
const { getEnv } = require('../config/env');

const env = getEnv();

const pool = new Pool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 30000,
  max: 10,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL client error:', error.message);
});

module.exports = pool;

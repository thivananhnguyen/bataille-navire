const dotenv = require('dotenv');

dotenv.config();

function toInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getEnv() {
  return {
    port: toInt(process.env.PORT, 3000),
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: toInt(process.env.DB_PORT, 5432),
    dbUser: requireEnv('DB_USER'),
    dbPassword: requireEnv('DB_PASSWORD'),
    dbName: requireEnv('DB_NAME'),
    messageTtlSeconds: toInt(process.env.MESSAGE_TTL_SECONDS, 3600),
  };
}

module.exports = { getEnv };

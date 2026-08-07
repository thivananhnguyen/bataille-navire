const { randomUUID } = require('crypto');
const pool = require('../db/pool');

function mapMessageRow(row) {
  return {
    id: row.id,
    author: row.author,
    content: row.content,
    expiresAt: row.expires_at.toISOString(),
    createdAt: row.created_at.toISOString(),
  };
}

async function initializeMessageTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function createMessage({ author, content, expiresAt }) {
  const result = await pool.query(
    `INSERT INTO messages (id, author, content, expires_at)
     VALUES ($1, $2, $3, $4)
     RETURNING id, author, content, expires_at, created_at`,
    [randomUUID(), author, content, expiresAt]
  );

  return mapMessageRow(result.rows[0]);
}

async function getActiveMessages() {
  const result = await pool.query(
    `SELECT id, author, content, expires_at, created_at
     FROM messages
     WHERE expires_at > NOW()
     ORDER BY created_at DESC`
  );

  return result.rows.map(mapMessageRow);
}

async function cleanupExpiredMessages() {
  const result = await pool.query('DELETE FROM messages WHERE expires_at <= NOW()');
  return result.rowCount;
}

async function performWork() {
  const result = await pool.query(
    `SELECT COUNT(*)::int AS active_count
     FROM messages
     WHERE expires_at > NOW()`
  );
  return result.rows[0].active_count;
}

module.exports = {
  initializeMessageTable,
  createMessage,
  getActiveMessages,
  cleanupExpiredMessages,
  performWork,
};

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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS work_events (
      id BIGSERIAL PRIMARY KEY,
      active_count INTEGER NOT NULL,
      payload_size INTEGER NOT NULL,
      checksum BIGINT NOT NULL,
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
  const client = await pool.connect();
  const startedAt = process.hrtime.bigint();

  try {
    await client.query('BEGIN');

    const activeResult = await client.query(
      `SELECT id, author, content
       FROM messages
       WHERE expires_at > NOW()
       ORDER BY created_at DESC
       LIMIT 50`
    );

    const activeMessages = activeResult.rows.length;
    const payloadSize = activeResult.rows.reduce(
      (sum, row) => sum + row.id.length + row.author.length + row.content.length,
      0
    );

    let checksum = 0;
    const iterations = 20000 + (payloadSize * 5);
    for (let i = 0; i < iterations; i += 1) {
      checksum = (checksum + ((i * 31) % 9973)) % 2147483647;
    }

    const insertResult = await client.query(
      `INSERT INTO work_events (active_count, payload_size, checksum)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [activeMessages, payloadSize, checksum]
    );

    await client.query(
      `DELETE FROM work_events
       WHERE created_at < NOW() - INTERVAL '15 minutes'`
    );

    await client.query('COMMIT');

    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
    return {
      activeMessages,
      workEventId: insertResult.rows[0].id,
      durationMs: Number(durationMs.toFixed(2)),
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  initializeMessageTable,
  createMessage,
  getActiveMessages,
  cleanupExpiredMessages,
  performWork,
};

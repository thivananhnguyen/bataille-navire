process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_PORT = process.env.DB_PORT || '5432';
process.env.DB_USER = process.env.DB_USER || 'message_user';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'test_password';
process.env.DB_NAME = process.env.DB_NAME || 'message_test';

const request = require('supertest');
const app = require('../../src/app');
const pool = require('../../src/db/pool');
const messageModel = require('../../src/models/message');

describe('Message API integration with PostgreSQL', () => {
  beforeAll(async () => {
    await messageModel.initializeMessageTable();
  });

  beforeEach(async () => {
    await pool.query('TRUNCATE TABLE messages');
  });

  afterAll(async () => {
    await pool.end();
  });

  test('creates message and reads it in active wall', async () => {
    const createResponse = await request(app)
      .post('/api/messages')
      .send({ author: 'Alice', content: 'Bonjour', ttlSeconds: 120 });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.id).toBeDefined();

    const listResponse = await request(app).get('/api/messages');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toHaveLength(1);
    expect(listResponse.body[0].author).toBe('Alice');
    expect(listResponse.body[0].content).toBe('Bonjour');
  });

  test('cleanup removes expired messages', async () => {
    await pool.query(
      `INSERT INTO messages (id, author, content, expires_at)
       VALUES ('old-msg', 'system', 'expired', NOW() - INTERVAL '10 seconds')`
    );

    const cleanupResponse = await request(app).post('/api/messages/cleanup');
    expect(cleanupResponse.status).toBe(200);
    expect(cleanupResponse.body.deleted).toBe(1);

    const listResponse = await request(app).get('/api/messages');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toEqual([]);
  });

  test('returns 400 for invalid body', async () => {
    const response = await request(app)
      .post('/api/messages')
      .send({ author: '', content: 'x', ttlSeconds: 30 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('author is required');
  });
});

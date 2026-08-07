process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_PORT = process.env.DB_PORT || '5432';
process.env.DB_USER = process.env.DB_USER || 'message_user';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'test_password';
process.env.DB_NAME = process.env.DB_NAME || 'message_test';

const request = require('supertest');
const { resetMetrics } = require('../../src/observability/metrics');

jest.mock('../../src/models/message', () => ({
  createMessage: jest.fn(),
  getActiveMessages: jest.fn(),
  cleanupExpiredMessages: jest.fn(),
}));

const messageModel = require('../../src/models/message');
const app = require('../../src/app');

describe('Message API unit behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetMetrics();
  });

  test('GET /health returns service status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(typeof response.body.timestamp).toBe('string');
  });

  test('POST /api/messages creates a message', async () => {
    const created = {
      id: 'msg-1',
      author: 'Van Anh',
      content: 'Salut la promo',
      expiresAt: new Date(Date.now() + 60000).toISOString(),
      createdAt: new Date().toISOString(),
    };

    messageModel.createMessage.mockResolvedValue(created);

    const response = await request(app)
      .post('/api/messages')
      .send({ author: ' Van Anh ', content: ' Salut la promo ', ttlSeconds: 120 });

    expect(response.status).toBe(201);
    expect(messageModel.createMessage).toHaveBeenCalledTimes(1);
    expect(messageModel.createMessage.mock.calls[0][0].author).toBe('Van Anh');
    expect(messageModel.createMessage.mock.calls[0][0].content).toBe('Salut la promo');
    expect(response.body).toEqual(created);
  });

  test('POST /api/messages returns 400 for invalid ttlSeconds', async () => {
    const response = await request(app)
      .post('/api/messages')
      .send({ author: 'A', content: 'B', ttlSeconds: 0 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('ttlSeconds must be a positive integer');
  });

  test('GET /api/messages returns active messages', async () => {
    messageModel.getActiveMessages.mockResolvedValue([
      {
        id: 'msg-1',
        author: 'A',
        content: 'hello',
        expiresAt: new Date(Date.now() + 10000).toISOString(),
        createdAt: new Date().toISOString(),
      },
    ]);

    const response = await request(app).get('/api/messages');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test('POST /api/messages/cleanup returns deleted count', async () => {
    messageModel.cleanupExpiredMessages.mockResolvedValue(3);

    const response = await request(app).post('/api/messages/cleanup');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ deleted: 3 });
  });

  test('GET /metrics returns prometheus text', async () => {
    const response = await request(app).get('/metrics');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/plain');
    expect(response.text).toContain('# HELP http_requests_total');
    expect(response.text).toContain('# TYPE messages_created_total counter');
  });

  test('counts unmatched 404 route in metrics', async () => {
    await request(app).get('/does-not-exist');

    const metricsResponse = await request(app).get('/metrics');
    const line = metricsResponse.text
      .split('\n')
      .find((entry) => entry.startsWith('http_requests_total{method="GET",route="unmatched",status="404"}'));

    expect(line).toBeDefined();
    expect(Number(line.split(' ').pop())).toBe(1);
  });
});

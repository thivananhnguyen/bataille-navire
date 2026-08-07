const client = require('prom-client');

const register = new client.Registry();

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of served HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.2, 0.5, 1, 2, 5],
  registers: [register],
});

const messagesCreatedTotal = new client.Counter({
  name: 'messages_created_total',
  help: 'Total number of created messages',
  registers: [register],
});

const messagesExpiredCleanupTotal = new client.Counter({
  name: 'messages_expired_cleanup_total',
  help: 'Total number of expired messages deleted by cleanup',
  registers: [register],
});

function normalizeRouteLabel(req) {
  if (req.route && typeof req.route.path === 'string') {
    const baseUrl = req.baseUrl || '';
    const fullRoute = `${baseUrl}${req.route.path}`;
    return fullRoute.length > 1 && fullRoute.endsWith('/')
      ? fullRoute.slice(0, -1)
      : fullRoute || '/';
  }

  if (req.path === '/health' || req.path === '/metrics') {
    return req.path;
  }

  return 'unmatched';
}

function metricsMiddleware(req, res, next) {
  const startTime = process.hrtime.bigint();

  res.on('finish', () => {
    const route = normalizeRouteLabel(req);
    const method = req.method;
    const status = String(res.statusCode);
    const durationSeconds = Number(process.hrtime.bigint() - startTime) / 1e9;

    httpRequestsTotal.inc({ method, route, status });
    httpRequestDurationSeconds.observe({ method, route, status }, durationSeconds);
  });

  next();
}

function incrementMessagesCreated() {
  messagesCreatedTotal.inc();
}

function addExpiredCleanupCount(count) {
  if (count > 0) {
    messagesExpiredCleanupTotal.inc(count);
  }
}

async function metricsHandler(req, res) {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
}

function resetMetrics() {
  register.resetMetrics();
}

module.exports = {
  metricsMiddleware,
  metricsHandler,
  incrementMessagesCreated,
  addExpiredCleanupCount,
  resetMetrics,
};

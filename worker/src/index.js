const http = require('http');

const apiBaseUrl = process.env.API_BASE_URL || 'http://api:3000';
const cleanupIntervalSeconds = Number.parseInt(process.env.CLEANUP_INTERVAL_SECONDS || '30', 10);
const workerPort = Number.parseInt(process.env.WORKER_PORT || '3002', 10);
const tableauUrl = process.env.TABLEAU_URL || '';
const groupDisplay = process.env.GROUPE_DISPLAY || '';

let lastCleanupAt = null;
let lastCleanupDeleted = 0;
let lastCleanupError = null;

async function cleanupExpiredMessages() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/messages/cleanup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`cleanup failed with status ${response.status}`);
    }

    const body = await response.json();
    lastCleanupDeleted = body.deleted || 0;
    lastCleanupAt = new Date().toISOString();
    lastCleanupError = null;
    console.log(`[worker] cleanup success deleted=${lastCleanupDeleted}`);
  } catch (error) {
    lastCleanupError = error.message;
    console.error('[worker] cleanup error:', error.message);
  }
}

function scheduleCleanup() {
  cleanupExpiredMessages();
  setInterval(cleanupExpiredMessages, Math.max(cleanupIntervalSeconds, 5) * 1000);
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    const body = {
      status: lastCleanupError ? 'degraded' : 'ok',
      timestamp: new Date().toISOString(),
      lastCleanupAt,
      lastCleanupDeleted,
      lastCleanupError,
    };

    res.writeHead(lastCleanupError ? 503 : 200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(workerPort, () => {
  console.log(`[worker] listening on ${workerPort}`);
  if (!tableauUrl) {
    console.warn('[worker] TABLEAU_URL is empty: tableau pulse is disabled for worker.');
  }
  if (!groupDisplay) {
    console.warn('[worker] GROUPE_DISPLAY is empty: tableau identity is incomplete.');
  }
  scheduleCleanup();
});

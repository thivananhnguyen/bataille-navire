const fs = require('fs');
const http = require('http');
const os = require('os');

const apiBaseUrl = process.env.API_BASE_URL || 'http://api:3000';
const cleanupIntervalSeconds = Number.parseInt(process.env.CLEANUP_INTERVAL_SECONDS || '30', 10);
const workerPort = Number.parseInt(process.env.WORKER_PORT || '3002', 10);
const tableauUrl = process.env.TABLEAU_URL || '';
const group = process.env.GROUPE || process.env.GROUPE_DISPLAY || '';
const color = process.env.COULEUR || '#888888';
const service = process.env.SERVICE || 'worker';
const version = process.env.VERSION || 'dev';
const internalUrl = process.env.URL_INTERNE || `http://worker:${workerPort}`;
const flagPath = process.env.PAVILLON_FICHIER || '/data/pavillon.txt';

let lastCleanupAt = null;
let lastCleanupDeleted = 0;
let lastCleanupError = null;
let totalHandled = 0;
let pendingHandled = 0;

function readFlag() {
  try {
    return fs.readFileSync(flagPath, 'utf8').trim();
  } catch {
    return '';
  }
}

async function handleIncomingHits(hitsToHandle) {
  const toHandle = Math.min(Number(hitsToHandle) || 0, 300);
  for (let i = 0; i < toHandle; i += 10) {
    const batch = [];
    for (let j = i; j < Math.min(i + 10, toHandle); j += 1) {
      batch.push(fetch(`${internalUrl}/travail`).catch(() => null));
    }
    await Promise.all(batch);
  }
}

async function sendPulse() {
  const declared = pendingHandled;
  let nextDelayMs = 5000;

  try {
    const response = await fetch(`${tableauUrl}/api/pulse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        groupe: group,
        couleur: color,
        service,
        pod: os.hostname(),
        conteneur: os.hostname(),
        version,
        pavillon: readFlag(),
        encaisses: declared,
        total_encaisse: totalHandled,
      }),
    });

    if (response.ok) {
      pendingHandled -= declared;
      const order = await response.json().catch(() => ({}));
      nextDelayMs = Number(order.prochain_pouls_ms || order.prochain_pulse_ms) || 5000;
      if ((Number(order.coups_a_encaisser) || 0) > 0) {
        await handleIncomingHits(order.coups_a_encaisser);
      }
    } else {
      const body = await response.text().catch(() => '');
      console.error(`[worker-pulse] tableau rejected pulse: status=${response.status} body=${body.slice(0, 180)}`);
    }
  } catch (error) {
    console.error(`[worker-pulse] tableau unreachable: ${error.message}`);
  }

  setTimeout(sendPulse, nextDelayMs);
}

function startPulse() {
  if (!tableauUrl || !group || !service) {
    console.log('[worker-pulse] disabled: set TABLEAU_URL, GROUPE and SERVICE to enable.');
    return;
  }

  console.log(`[worker-pulse] ${group}/${service} -> ${tableauUrl}`);
  sendPulse();
}

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

async function processWorkload() {
  // Worker does real work: API call + local CPU loop.
  const response = await fetch(`${apiBaseUrl}/api/messages`);
  if (!response.ok) {
    throw new Error(`dependency returned ${response.status}`);
  }

  const messages = await response.json();
  const payload = Array.isArray(messages) ? messages : [];
  const loops = 10000 + (payload.length * 500);
  let checksum = 0;

  for (let i = 0; i < loops; i += 1) {
    checksum = (checksum + ((i * 17) % 7919)) % 2147483647;
  }

  totalHandled += 1;
  pendingHandled += 1;

  return {
    status: 'ok',
    items: payload.length,
    checksum,
  };
}

const server = http.createServer((req, res) => {
  if (req.url === '/travail') {
    processWorkload()
      .then((result) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      })
      .catch((error) => {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'unavailable', error: error.message }));
      });
    return;
  }

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
  if (!group) {
    console.warn('[worker] GROUPE is empty: tableau identity is incomplete.');
  }
  scheduleCleanup();
  startPulse();
});

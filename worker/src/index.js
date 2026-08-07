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
let dependencyApiUp = 1;

const histogramBuckets = [0.005, 0.01, 0.025, 0.05, 0.1, 0.2, 0.5, 1, 2, 5];
const requestCounters = new Map();
const travailHistograms = new Map();

function escapeLabelValue(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/"/g, '\\"');
}

function labelsToString(labels) {
  return Object.entries(labels)
    .map(([key, value]) => `${key}="${escapeLabelValue(value)}"`)
    .join(',');
}

function incrementRequestCount(method, route, status) {
  const key = `${method}|${route}|${status}`;
  requestCounters.set(key, (requestCounters.get(key) || 0) + 1);
}

function observeTravailHistogram(method, status, durationSeconds) {
  const key = `${method}|${status}`;
  let series = travailHistograms.get(key);

  if (!series) {
    series = {
      bucketCounts: new Array(histogramBuckets.length).fill(0),
      count: 0,
      sum: 0,
    };
    travailHistograms.set(key, series);
  }

  let bucketIndex = histogramBuckets.length - 1;
  for (let i = 0; i < histogramBuckets.length; i += 1) {
    if (durationSeconds <= histogramBuckets[i]) {
      bucketIndex = i;
      break;
    }
  }

  series.bucketCounts[bucketIndex] += 1;
  series.count += 1;
  series.sum += durationSeconds;
}

function renderMetrics() {
  const lines = [];

  lines.push('# HELP http_requests_total Total number of served HTTP requests');
  lines.push('# TYPE http_requests_total counter');
  for (const [key, value] of requestCounters.entries()) {
    const [method, route, status] = key.split('|');
    lines.push(`http_requests_total{${labelsToString({ method, route, status })}} ${value}`);
  }

  lines.push('# HELP http_request_duration_seconds Duration of /travail HTTP requests in seconds');
  lines.push('# TYPE http_request_duration_seconds histogram');
  for (const [key, series] of travailHistograms.entries()) {
    const [method, status] = key.split('|');
    let cumulative = 0;

    for (let i = 0; i < histogramBuckets.length; i += 1) {
      cumulative += series.bucketCounts[i];
      lines.push(`http_request_duration_seconds_bucket{${labelsToString({ method, route: '/travail', status, le: histogramBuckets[i] })}} ${cumulative}`);
    }

    lines.push(`http_request_duration_seconds_bucket{${labelsToString({ method, route: '/travail', status, le: '+Inf' })}} ${series.count}`);
    lines.push(`http_request_duration_seconds_sum{${labelsToString({ method, route: '/travail', status })}} ${series.sum}`);
    lines.push(`http_request_duration_seconds_count{${labelsToString({ method, route: '/travail', status })}} ${series.count}`);
  }

  lines.push('# HELP service_hits_handled_total Total number of hits handled by service');
  lines.push('# TYPE service_hits_handled_total counter');
  lines.push(`service_hits_handled_total{${labelsToString({ service })}} ${totalHandled}`);

  lines.push('# HELP service_dependency_up Dependency status (1=up, 0=down)');
  lines.push('# TYPE service_dependency_up gauge');
  lines.push(`service_dependency_up{${labelsToString({ service, dependency: 'api' })}} ${dependencyApiUp ? 1 : 0}`);

  lines.push('# HELP service_build_info Build information for service version (always 1)');
  lines.push('# TYPE service_build_info gauge');
  lines.push(`service_build_info{${labelsToString({ service, version })}} 1`);

  return `${lines.join('\n')}\n`;
}

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
      dependencyApiUp = 0;
      throw new Error(`cleanup failed with status ${response.status}`);
    }

    const body = await response.json();
    lastCleanupDeleted = body.deleted || 0;
    lastCleanupAt = new Date().toISOString();
    lastCleanupError = null;
    dependencyApiUp = 1;
    console.log(`[worker] cleanup success deleted=${lastCleanupDeleted}`);
  } catch (error) {
    lastCleanupError = error.message;
    dependencyApiUp = 0;
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
    dependencyApiUp = 0;
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
  dependencyApiUp = 1;

  return {
    status: 'ok',
    items: payload.length,
    checksum,
  };
}

const server = http.createServer((req, res) => {
  const startTime = process.hrtime.bigint();
  let routeLabel = 'unmatched';

  res.on('finish', () => {
    if (routeLabel === '/metrics') {
      return;
    }

    incrementRequestCount(req.method, routeLabel, String(res.statusCode));
    if (routeLabel === '/travail') {
      const durationSeconds = Number(process.hrtime.bigint() - startTime) / 1e9;
      observeTravailHistogram(req.method, String(res.statusCode), durationSeconds);
    }
  });

  if (req.url === '/metrics') {
    routeLabel = '/metrics';
    res.writeHead(200, { 'Content-Type': 'text/plain; version=0.0.4; charset=utf-8' });
    res.end(renderMetrics());
    return;
  }

  if (req.url === '/travail') {
    routeLabel = '/travail';
    processWorkload()
      .then((result) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      })
      .catch((error) => {
        dependencyApiUp = 0;
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'unavailable', error: error.message }));
      });
    return;
  }

  if (req.url === '/health') {
    routeLabel = '/health';
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

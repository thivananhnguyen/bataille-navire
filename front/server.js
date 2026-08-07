const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { URL } = require('url');

const port = Number.parseInt(process.env.PORT || '8080', 10);
const apiBaseUrl = process.env.API_BASE_URL || 'http://api:3000';
const tableauUrl = process.env.TABLEAU_URL || '';
const group = process.env.GROUPE || process.env.GROUPE_DISPLAY || '';
const color = process.env.COULEUR || '#888888';
const service = process.env.SERVICE || 'front';
const version = process.env.VERSION || 'dev';
const internalUrl = process.env.URL_INTERNE || `http://front:${port}`;
const flagPath = process.env.PAVILLON_FICHIER || '/data/pavillon.txt';
const htmlPath = path.join(__dirname, 'index.html');

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

  return `${lines.join('\n')}\n`;
}

function contentTypeFor(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  return 'text/plain; charset=utf-8';
}

function readFlag() {
  try {
    return fs.readFileSync(flagPath, 'utf8').trim();
  } catch {
    return '';
  }
}

async function proxyJson(targetUrl, method = 'GET', body = undefined, headers = {}) {
  const response = await fetch(targetUrl, {
    method,
    headers,
    body,
  });

  const text = await response.text();
  return {
    ok: response.ok,
    status: response.status,
    headers: response.headers,
    text,
  };
}

async function processWorkload() {
  // Front work: query backend + local CPU loop.
  const response = await fetch(`${apiBaseUrl}/api/messages`);

  if (!response.ok) {
    dependencyApiUp = 0;
    throw new Error(`dependency returned ${response.status}`);
  }

  const payload = await response.json();
  const size = Array.isArray(payload) ? payload.length : 0;
  const loops = 8000 + (size * 350);
  let checksum = 0;

  for (let i = 0; i < loops; i += 1) {
    checksum = (checksum + ((i * 13) % 6151)) % 2147483647;
  }

  totalHandled += 1;
  pendingHandled += 1;
  dependencyApiUp = 1;

  return {
    status: 'ok',
    items: size,
    checksum,
  };
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
      console.error(`[front-pulse] tableau rejected pulse: status=${response.status} body=${body.slice(0, 180)}`);
    }
  } catch (error) {
    console.error(`[front-pulse] tableau unreachable: ${error.message}`);
  }

  setTimeout(sendPulse, nextDelayMs);
}

function startPulse() {
  if (!tableauUrl || !group || !service) {
    console.log('[front-pulse] disabled: set TABLEAU_URL, GROUPE and SERVICE to enable.');
    return;
  }

  console.log(`[front-pulse] ${group}/${service} -> ${tableauUrl}`);
  sendPulse();
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
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

  if (url.pathname === '/metrics') {
    routeLabel = '/metrics';
    res.writeHead(200, { 'Content-Type': 'text/plain; version=0.0.4; charset=utf-8' });
    res.end(renderMetrics());
    return;
  }

  if (url.pathname === '/health') {
    routeLabel = '/health';
    const body = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
    return;
  }

  if (url.pathname === '/travail') {
    routeLabel = '/travail';
    try {
      const result = await processWorkload();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (error) {
      dependencyApiUp = 0;
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'unavailable', error: error.message }));
    }
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    routeLabel = '/api/*';
    try {
      let body;
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(chunk);
        }
        body = Buffer.concat(chunks);
      }

      const proxied = await proxyJson(`${apiBaseUrl}${url.pathname}${url.search}`, req.method, body, {
        'Content-Type': req.headers['content-type'] || 'application/json',
      });

      dependencyApiUp = 1;

      res.writeHead(proxied.status, {
        'Content-Type': proxied.headers.get('content-type') || 'application/json',
      });
      res.end(proxied.text);
    } catch (error) {
      dependencyApiUp = 0;
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `api unavailable: ${error.message}` }));
    }
    return;
  }

  if (url.pathname === '/' || url.pathname === '/index.html') {
    routeLabel = '/';
    try {
      const html = fs.readFileSync(htmlPath, 'utf8');
      res.writeHead(200, { 'Content-Type': contentTypeFor(htmlPath) });
      res.end(html);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`front template error: ${error.message}`);
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(port, () => {
  console.log(`[front] listening on ${port}`);
  if (!tableauUrl) {
    console.warn('[front] TABLEAU_URL is empty: tableau pulse is disabled for front.');
  }
  if (!group) {
    console.warn('[front] GROUPE is empty: tableau identity is incomplete.');
  }
  startPulse();
});

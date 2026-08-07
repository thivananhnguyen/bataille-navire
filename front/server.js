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

  if (url.pathname === '/health') {
    const body = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
    return;
  }

  if (url.pathname === '/travail') {
    try {
      const result = await processWorkload();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (error) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'unavailable', error: error.message }));
    }
    return;
  }

  if (url.pathname.startsWith('/api/')) {
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

      res.writeHead(proxied.status, {
        'Content-Type': proxied.headers.get('content-type') || 'application/json',
      });
      res.end(proxied.text);
    } catch (error) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `api unavailable: ${error.message}` }));
    }
    return;
  }

  if (url.pathname === '/' || url.pathname === '/index.html') {
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

const fs = require('fs');
const os = require('os');

const state = {
  totalHandled: 0,
  pendingHandled: 0,
};

function recordHandled(count = 1) {
  state.totalHandled += count;
  state.pendingHandled += count;
}

async function handleIncomingHits(internalBaseUrl, hitsToHandle) {
  const toHandle = Math.min(Number(hitsToHandle) || 0, 300);
  for (let i = 0; i < toHandle; i += 10) {
    const batch = [];
    for (let j = i; j < Math.min(i + 10, toHandle); j += 1) {
      batch.push(fetch(`${internalBaseUrl}/travail`).catch(() => null));
    }
    await Promise.all(batch);
  }
}

function readFlag(flagPath) {
  try {
    return fs.readFileSync(flagPath, 'utf8').trim();
  } catch {
    return '';
  }
}

async function sendPulse(config) {
  const declared = state.pendingHandled;
  let nextDelayMs = 5000;

  try {
    const response = await fetch(`${config.tableauUrl}/api/pulse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        groupe: config.group,
        couleur: config.color,
        service: config.service,
        pod: os.hostname(),
        conteneur: os.hostname(),
        version: config.version,
        pavillon: readFlag(config.flagPath),
        encaisses: declared,
        total_encaisse: state.totalHandled,
      }),
    });

    // Remove reported hits only after the tableau successfully received them.
    if (response.ok) {
      state.pendingHandled -= declared;
      const order = await response.json().catch(() => ({}));
      nextDelayMs = Number(order.prochain_pouls_ms || order.prochain_pulse_ms) || 5000;
      if ((Number(order.coups_a_encaisser) || 0) > 0) {
        await handleIncomingHits(config.internalBaseUrl, order.coups_a_encaisser);
      }
    } else {
      const body = await response.text().catch(() => '');
      console.error(`[pulse] tableau rejected pulse: status=${response.status} body=${body.slice(0, 180)}`);
    }
  } catch (error) {
    console.error(`[pulse] tableau unreachable: ${error.message}`);
  }

  setTimeout(() => {
    sendPulse(config);
  }, nextDelayMs);
}

function startPulseFromEnv() {
  const tableauUrl = process.env.TABLEAU_URL || '';
  const group = process.env.GROUPE || '';
  const service = process.env.SERVICE || 'api';
  const color = process.env.COULEUR || '#888888';
  const version = process.env.VERSION || 'dev';
  const internalBaseUrl = process.env.URL_INTERNE || 'http://localhost:3000';
  const flagPath = process.env.PAVILLON_FICHIER || '/data/pavillon.txt';

  if (!tableauUrl || !group || !service) {
    console.log('[pulse] disabled: set TABLEAU_URL, GROUPE and SERVICE to enable.');
    return;
  }

  console.log(`[pulse] ${group}/${service} -> ${tableauUrl}`);
  sendPulse({
    tableauUrl,
    group,
    service,
    color,
    version,
    internalBaseUrl,
    flagPath,
  });
}

module.exports = {
  recordHandled,
  startPulseFromEnv,
};

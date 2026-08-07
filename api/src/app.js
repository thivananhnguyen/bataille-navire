const cors = require('cors');
const express = require('express');
const fs = require('fs/promises');
const helmet = require('helmet');
const path = require('path');
const messagesRoutes = require('./routes/messages');
const messagesController = require('./controllers/messagesController');
const errorHandler = require('./middleware/errorHandler');
const { metricsMiddleware, metricsHandler } = require('./observability/metrics');

const app = express();
const PAVILLON_MAX_LENGTH = 140;

function parsePavillonMessage(body) {
  if (typeof body === 'string') {
    return body.trim();
  }

  if (body && typeof body === 'object') {
    const candidate = body.pavillon ?? body.message ?? body.text;
    if (typeof candidate === 'string') {
      return candidate.trim();
    }
  }

  return '';
}

async function writePavillonFile(content) {
  const flagPath = process.env.PAVILLON_FICHIER || '/data/pavillon.txt';
  await fs.mkdir(path.dirname(flagPath), { recursive: true });
  await fs.writeFile(flagPath, `${content}\n`, 'utf8');
}

app.use(helmet());
app.use(cors());
app.use(metricsMiddleware);
app.use(express.text({ type: 'text/plain', limit: '2kb' }));
app.use(express.json({ limit: '16kb' }));

const healthController = require('./controllers/healthController');

app.get('/health', healthController.getHealth);
app.post('/pavillon', express.text({ type: '*/*', limit: '16kb' }), healthController.postPavillon);

app.get('/travail', messagesController.processWork);

app.post('/pavillon', async (req, res, next) => {
  try {
    const pavillon = parsePavillonMessage(req.body);
    if (!pavillon) {
      return res.status(400).json({ error: 'pavillon message is required' });
    }

    if (pavillon.length > PAVILLON_MAX_LENGTH) {
      return res.status(400).json({ error: 'pavillon must be 140 characters or fewer' });
    }

    await writePavillonFile(pavillon);
    return res.status(201).json({ status: 'created', pavillon });
  } catch (error) {
    return next(error);
  }
});

app.get('/metrics', metricsHandler);
app.use('/api/messages', messagesRoutes);

app.use(errorHandler);

module.exports = app;

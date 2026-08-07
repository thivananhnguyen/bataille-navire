const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const messagesRoutes = require('./routes/messages');
const errorHandler = require('./middleware/errorHandler');
const { metricsMiddleware, metricsHandler } = require('./observability/metrics');

const app = express();

app.use(helmet());
app.use(cors());
app.use(metricsMiddleware);
app.use(express.json({ limit: '16kb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/metrics', metricsHandler);
app.use('/api/messages', messagesRoutes);

app.use(errorHandler);

module.exports = app;

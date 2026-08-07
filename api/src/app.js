const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const messagesRoutes = require('./routes/messages');
const messagesController = require('./controllers/messagesController');
const errorHandler = require('./middleware/errorHandler');
const { metricsMiddleware, metricsHandler } = require('./observability/metrics');

const app = express();

app.use(helmet());
app.use(cors());
app.use(metricsMiddleware);
app.use(express.json({ limit: '16kb' }));

const healthController = require('./controllers/healthController');

app.get('/health', healthController.getHealth);
app.post('/pavillon', express.text({ type: '*/*', limit: '16kb' }), healthController.postPavillon);

app.get('/travail', messagesController.processWork);

app.get('/metrics', metricsHandler);
app.use('/api/messages', messagesRoutes);

app.use(errorHandler);

module.exports = app;

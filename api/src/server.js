const app = require('./app');
const { getEnv } = require('./config/env');
const messageModel = require('./models/message');
const { startPulseFromEnv } = require('./observability/pulse');

async function start() {
  const env = getEnv();
  await messageModel.initializeMessageTable();

  app.listen(env.port, () => {
    console.log(`bataille-navire-api listening on port ${env.port}`);
    startPulseFromEnv();
  });
}

start().catch((error) => {
  console.error('Failed to start API:', error.message);
  process.exit(1);
});

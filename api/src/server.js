const app = require('./app');
const { getEnv } = require('./config/env');
const messageModel = require('./models/message');

async function start() {
  const env = getEnv();
  await messageModel.initializeMessageTable();

  app.listen(env.port, () => {
    console.log(`bataille-navire-api listening on port ${env.port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start API:', error.message);
  process.exit(1);
});

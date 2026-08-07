const asyncHandler = require('../utils/asyncHandler');
const messageModel = require('../models/message');
const { incrementMessagesCreated, addExpiredCleanupCount } = require('../observability/metrics');
const { recordHandled } = require('../observability/pulse');

const createMessage = asyncHandler(async (req, res) => {
  const expiresAt = new Date(Date.now() + req.validatedMessage.ttlSeconds * 1000);
  const message = await messageModel.createMessage({
    author: req.validatedMessage.author,
    content: req.validatedMessage.content,
    expiresAt,
  });

  incrementMessagesCreated();
  return res.status(201).json(message);
});

const getMessages = asyncHandler(async (req, res) => {
  const messages = await messageModel.getActiveMessages();
  return res.json(messages);
});

const cleanupExpiredMessages = asyncHandler(async (req, res) => {
  const deleted = await messageModel.cleanupExpiredMessages();
  addExpiredCleanupCount(deleted);
  return res.json({ deleted });
});

const processWork = asyncHandler(async (req, res) => {
  const activeMessages = await messageModel.performWork();
  recordHandled(1);
  return res.json({ status: 'ok', activeMessages });
});

module.exports = {
  createMessage,
  getMessages,
  cleanupExpiredMessages,
  processWork,
};

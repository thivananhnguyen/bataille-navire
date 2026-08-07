function parsePositiveInt(value, fallback) {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function validateCreateMessage(req, res, next) {
  const author = typeof req.body.author === 'string' ? req.body.author.trim() : '';
  const content = typeof req.body.content === 'string' ? req.body.content.trim() : '';
  const ttlSeconds = parsePositiveInt(req.body.ttlSeconds, null);

  if (!author) {
    return res.status(400).json({ error: 'author is required' });
  }

  if (author.length > 80) {
    return res.status(400).json({ error: 'author must be at most 80 characters' });
  }

  if (!content) {
    return res.status(400).json({ error: 'content is required' });
  }

  if (content.length > 1000) {
    return res.status(400).json({ error: 'content must be at most 1000 characters' });
  }

  if (ttlSeconds === null) {
    return res.status(400).json({ error: 'ttlSeconds must be a positive integer' });
  }

  if (ttlSeconds > 86400) {
    return res.status(400).json({ error: 'ttlSeconds must be at most 86400' });
  }

  req.validatedMessage = { author, content, ttlSeconds };
  next();
}

module.exports = {
  validateCreateMessage,
};

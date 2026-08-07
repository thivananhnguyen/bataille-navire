function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'Malformed JSON payload';
  }

  if (err.type === 'entity.too.large') {
    status = 400;
    message = 'JSON payload is too large';
  }

  res.status(status).json({ error: message });
}

module.exports = errorHandler;

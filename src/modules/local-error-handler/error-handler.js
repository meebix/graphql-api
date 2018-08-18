import logger from 'modules/local-logger';
import sanitizeError from './error-sanitizer';

function errorHandler({ loggerPrefix, error, req, res }) {
  const err = sanitizeError(error);
  const level = Number(err.statusCode) >= 500 ? 'error' : 'warn';

  logger[level]({ err, req, res }, `${loggerPrefix}: ${err.message}`);
  return res.status(err.statusCode).json({ errors: err.jsonResponse });
}

export default errorHandler;

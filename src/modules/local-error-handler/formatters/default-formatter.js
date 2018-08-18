import * as objectPath from 'object-path';

/**
 * Format the error according to manually thrown errors or unknown errors
 *
 * @function
 * @param {Object} err - Error thrown from controller
 * @returns {Object} - Decorated Error object
 */
function defaultError(err) {
  const error = err;
  const statusCode = objectPath.get(error, 'statusCode', 500);
  const code = objectPath.get(error, 'code', 'SERVER_ERROR');
  const meta = objectPath.get(error, 'meta', undefined);

  error.statusCode = statusCode;
  error.jsonResponse = [{
    statusCode,
    message: error.message,
    code,
    meta,
  }];

  return error;
}

export default defaultError;

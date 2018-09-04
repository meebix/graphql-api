import objectPath from 'object-path';

/**
 * Format the error according to JsonWebToken (JWT)
 *
 * @function
 * @param {Object} err - Error from JsonWebToken (JWT)
 * @returns {Object} - Decorated Error object
 */
function jwtError(err) {
  const error = err;
  const statusCode = objectPath.get(error, 'statusCode', 500);
  const code = objectPath.get(error, 'code', 'SERVER_ERROR');
  const name = objectPath.get(error, 'name', undefined);
  const expiredAt = objectPath.get(error, 'expiredAt', undefined);

  error.statusCode = statusCode;
  error.jsonResponse = [{
    statusCode,
    message: error.message,
    code,
    meta: { name, expiredAt },
  }];

  return error;
}

export default jwtError;

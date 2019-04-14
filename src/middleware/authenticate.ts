import jwt from 'jsonwebtoken';
import config from 'config';
import logger from '@modules/logger';
import ApiError from '@modules/errors';

/**
 * Retrieve the Bearer authorization token from the header
 *
 * @function
 * @param {Object} headers - Request headers
 * @returns {Object} - token
 */
const getTokenFromHeader = headers => {
  let token;
  const headerParts =
    (headers.authorization && headers.authorization.split(' ')) || [];

  if (headerParts.length === 2) {
    const scheme = headerParts[0];
    const credentials = headerParts[1];

    if (/^Bearer$/i.test(scheme)) {
      token = credentials;
    }
  }

  return token;
};

/**
 * Verifies the JWT and returns it or throws an error
 *
 * @function
 * @returns {Object} - Sets user on context; returns undefined
 */
const authenticate = context => {
  // Skip authentication if auth is turned off
  if (!config.get('auth.enable')) {
    return true;
  }

  const token = getTokenFromHeader(context.req.headers);

  return jwt.verify(token, config.get('auth.jwt.secret'), (err, decoded) => {
    if (err) {
      return ApiError('UNAUTHENTICATED');
    }

    logger.info('AUTHENTICATE-MIDDLEWARE: Returning token');

    // Add the user to context for continued access
    context.user = decoded;
    return true;
  });
};

export default authenticate;

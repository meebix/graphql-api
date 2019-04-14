"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _logger = _interopRequireDefault(require("@modules/logger"));

var _errors = require("@modules/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieve the Bearer authorization token from the header
 *
 * @function
 * @param {Object} headers - Request headers
 * @returns {Object} - token
 */
const getTokenFromHeader = headers => {
  let token;
  const headerParts = headers.authorization && headers.authorization.split(' ') || [];

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
  if (_config.default.get('auth.jwt') === false) {
    return true;
  }

  const token = getTokenFromHeader(context.req.headers);
  return _jsonwebtoken.default.verify(token, _config.default.get('auth.jwt.secret'), (err, decoded) => {
    if (err) {
      return new _errors.ApiError({
        type: 'UNAUTHENTICATED',
        err
      });
    }

    _logger.default.info('AUTHENTICATE-MIDDLEWARE: Returning token'); // Add the user to context for continued access


    context.user = decoded;
    return true;
  });
};

var _default = authenticate;
exports.default = _default;
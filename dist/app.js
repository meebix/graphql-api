'use strict';

require('app-module-path/register');

require('reflect-metadata');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _localErrorHandler = require('local-error-handler');

var _localErrorHandler2 = _interopRequireDefault(_localErrorHandler);

var _localLogger = require('local-logger');

var _localLogger2 = _interopRequireDefault(_localLogger);

var _requestLogger = require('middleware/request-logger');

var _requestLogger2 = _interopRequireDefault(_requestLogger);

var _expressHealthcheck = require('express-healthcheck');

var _expressHealthcheck2 = _interopRequireDefault(_expressHealthcheck);

var _apolloServerExpress = require('apollo-server-express');

var _graphqlSchema = require('./api/graphql/graphql-schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For better local node_module paths (i.e. require('local-module'))
const app = (0, _express2.default)();
const baseUrl = '/api';
const graphqlUrl = `${baseUrl}/graphql`;

// Security Headers
app.use((0, _helmet2.default)());
app.use(_helmet2.default.referrerPolicy({ policy: 'same-origin' }));
app.use(_helmet2.default.contentSecurityPolicy({
  directives: _config2.default.contentSecurityPolicy
}));

// Global middleware
app.use('/public', _express2.default.static('public'));
app.use('/health-check', (0, _expressHealthcheck2.default)());
app.use((0, _requestLogger2.default)());
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}));

// Route middleware
const verifyJwt = require('middleware/verify-jwt');

// Routes
// const mfaRoutes = require('./api/mfa/mfa-routes');
const tokenRoutes = require('./api/token/token-routes');
// const authRoutes = require('./api/auth/auth-routes');
// const mailerRoutes = require('./api/mailer/mailer-routes');
// const paymentRoutes = require('./api/payments/payments-routes');

// app.use(`${baseUrl}/mfa`, mfaRoutes);
app.use(`${baseUrl}/token`, tokenRoutes);
// app.use(`${baseUrl}/auth`, authRoutes);
// app.use(`${baseUrl}/mailer`, mailerRoutes);
// app.use(`${baseUrl}/payments`, verifyJwt(), paymentRoutes);

// GraphQL
app.use(graphqlUrl, verifyJwt(), (0, _apolloServerExpress.graphqlExpress)(req => ({
  schema: _graphqlSchema.graphqlSchema,
  context: {
    req,
    user: req.user
  }
})));

if (_config2.default.server.docs) {
  app.use(`${baseUrl}/docs`, (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: graphqlUrl }));
}

// Handle unknown routes (404s)
app.use((req, res, next) => {
  // eslint-disable-line no-unused-vars
  const appError = {
    name: 'AppError',
    message: 'Unknown route requested',
    statusCode: '404',
    errors: [{
      statusCode: '404',
      message: 'Unknown route requested',
      code: 'UNKNOWN_ROUTE',
      meta: { route: req.url }
    }]
  };

  const err = (0, _localErrorHandler2.default)(appError);

  _localLogger2.default.warn({ response: appError }, `APP-MIDDLEWARE: ${err.message}`);
  return res.status(err.statusCode).json({ errors: err.jsonResponse });
});

// Error middleware
app.use((error, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const err = (0, _localErrorHandler2.default)(error);

  _localLogger2.default.error({ err: error, response: err }, `APP-MIDDLEWARE: ${err.message}`);
  return res.status(err.statusCode).json({ errors: err.jsonResponse });
});

// Start app
app.listen(_config2.default.server.port, () => {
  _localLogger2.default.info({
    port: _config2.default.server.port,
    env: process.env.NODE_ENV || 'development'
  }, 'Server has been started');
});

module.exports = app;
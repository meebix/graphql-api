"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _graphqlMiddleware = require("graphql-middleware");

var _config = _interopRequireDefault(require("config"));

var _helmet = _interopRequireDefault(require("helmet"));

var _expressHealthcheck = _interopRequireDefault(require("express-healthcheck"));

var _prismaClient = require("@prisma/generated/prisma-client");

var _logger = _interopRequireDefault(require("@modules/logger"));

var _requestLogger = _interopRequireDefault(require("@middleware/request-logger"));

var _resolverLogger = _interopRequireDefault(require("@middleware/resolver-logger"));

var _permissions = _interopRequireDefault(require("@middleware/permissions"));

var _validations = _interopRequireDefault(require("@middleware/validations"));

var _user = require("@models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Models
// Express & Middleware
const app = (0, _express.default)();
app.use((0, _helmet.default)());
app.use(_helmet.default.referrerPolicy({
  policy: 'same-origin'
}));
app.use(_helmet.default.contentSecurityPolicy({
  directives: _config.default.get('contentSecurityPolicy')
}));
app.use('/health-check', (0, _expressHealthcheck.default)());
app.use((0, _requestLogger.default)()); // GraphQL schemas, middleware, and server setup

const graphqlSchema = (0, _apolloServerExpress.makeExecutableSchema)({
  typeDefs: [_user.types],
  resolvers: { ..._user.resolvers
  }
});
const schema = (0, _graphqlMiddleware.applyMiddleware)(graphqlSchema, _resolverLogger.default, _permissions.default, _validations.default);
const server = new _apolloServerExpress.ApolloServer({
  schema,
  context: ({
    req,
    res
  }) => ({
    req,
    res,
    prisma: _prismaClient.prisma
  }),
  playground: _config.default.get('graphql.playground'),
  debug: _config.default.get('graphql.debug'),
  formatError: err => {
    const name = err.extensions.exception.name || 'Error';
    const level = err.extensions.exception.level || 'error';

    _logger.default[level]({
      err
    }, `${name}: ${err.message}`);

    if (name === 'ValidationError') {
      err.extensions.code = 'VALIDATION_ERROR';
      delete err.extensions.exception.name;
      delete err.extensions.exception.value;
      delete err.extensions.exception.message;
      delete err.extensions.exception.params;
    } else {
      delete err.extensions.exception;
    }

    return err;
  }
}); // Apply Express middleware to GraphQL server

server.applyMiddleware({
  app,
  path: _config.default.get('graphql.path'),
  cors: {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
  },
  bodyParserConfig: true
}); // Start GraphQL server

app.listen({
  port: _config.default.get('port')
}, () => {
  _logger.default.info({
    port: _config.default.get('port'),
    env: process.env.NODE_ENV || 'development'
  }, 'Server has been started');
});
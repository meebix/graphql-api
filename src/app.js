// For better local node_module paths (i.e. require('local-module'))
import 'app-module-path/register';
import 'source-map-support/register';

import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as config from 'config';
import * as healthCheck from 'express-healthcheck';
import { createConnection } from 'typeorm';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import errorHandler from 'modules/local-error-handler';
import logger from 'modules/local-logger';
import requestLogger from 'middleware/request-logger';
import graphqlSchema from './api/graphql/graphql-schema';

import tokenRoutes from './api/token/token-routes';

const app = express();
const baseUrl = '/api';
const graphqlUrl = `${baseUrl}/graphql`;
const appRoutes = [
  tokenRoutes,
];

// Security Headers
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.contentSecurityPolicy({
  directives: config.contentSecurityPolicy,
}));

// Global middleware
app.use('/public', express.static('public'));
app.use('/health-check', healthCheck());
app.use(requestLogger());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
}));

// Register application routes
appRoutes.forEach((entry) => {
  entry.actions.forEach((path) => {
    const route = `${baseUrl}${entry.root}${path.route}`;

    app[path.method](route, ...path.middleware, (req, res, next) => {
      path.action(req, res)
        .then(() => next)
        .catch(err => next(err));
    });
  });
});

// GraphQL
app.use(graphqlUrl, graphqlExpress(req => ({
  schema: graphqlSchema,
  context: {
    req,
    user: req.user,
  },
})));

if (config.graphql.docs) {
  app.use(`${baseUrl}/docs`, graphiqlExpress({ endpointURL: graphqlUrl }));
}

// Handle unknown routes (404s)
app.use((req, res) => (
  errorHandler({
    loggerPrefix: 'APP-MIDDLEWARE',
    error: {
      name: 'AppError',
      message: 'Unknown route requested',
      statusCode: 404,
      jsonResponse: [{
        statusCode: 404,
        message: 'Unknown route requested',
        code: 'UNKNOWN_ROUTE',
        meta: { route: req.url, method: req.method },
      }],
    },
    req,
    res,
  })));

// Error middleware
app.use((error, req, res, next) => ( // eslint-disable-line no-unused-vars
  errorHandler({
    loggerPrefix: 'APP-MIDDLEWARE',
    error,
    req,
    res,
  })));

// Create database connection
createConnection(config.orm).then(async () => {
  app.listen(config.port, () => {
    logger.info({
      port: config.port,
      env: process.env.NODE_ENV || 'development',
    }, 'Server has been started');
  });
});

module.exports = app;

import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import config from 'config';
import helmet from 'helmet';
import healthCheck from 'express-healthcheck';
import { prisma } from '@prisma/generated/prisma-client';
import logger from '@modules/logger';
import requestLogger from '@middleware/request-logger';
import resolverLogger from '@middleware/resolver-logger';
import permissions from '@middleware/permissions';
import validations from '@middleware/validations';

// Models
import { types as userTypes, resolvers as userResolvers } from '@models/user';

// Express & Middleware
const app = express();
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(
  helmet.contentSecurityPolicy({
    directives: config.get('contentSecurityPolicy'),
  })
);
app.use('/health-check', healthCheck());
app.use(requestLogger());

// GraphQL schemas, middleware, and server setup
const graphqlSchema = makeExecutableSchema({
  typeDefs: [userTypes],
  resolvers: { ...userResolvers },
});

const schema = applyMiddleware(
  graphqlSchema,
  resolverLogger,
  permissions,
  validations
);

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    req,
    res,
    prisma,
  }),
  playground: config.get('graphql.playground'),
  debug: config.get('graphql.debug'),
  formatError: err => {
    const name = err.extensions.exception.name || 'Error';
    const level = err.extensions.exception.level || 'error';

    logger[level]({ err }, `${name}: ${err.message}`);

    if (name === 'ValidationError') {
      err.extensions.code = 'VALIDATION_ERROR';

      delete err.extensions.exception.name;
      delete err.extensions.exception.value;
      delete err.extensions.exception.message;
      delete err.extensions.exception.params;
      delete err.extensions.exception.stacktrace;
    } else {
      delete err.extensions.exception;
    }
    return err;
  },
});

// Apply Express middleware to GraphQL server
server.applyMiddleware({
  app,
  path: config.get('graphql.path'),
  cors: {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
  },
  bodyParserConfig: true,
});

// Start GraphQL server
app.listen({ port: config.get('port') }, () => {
  logger.info(
    {
      port: config.get('port'),
      env: process.env.NODE_ENV || 'development',
    },
    'Server has been started'
  );
});

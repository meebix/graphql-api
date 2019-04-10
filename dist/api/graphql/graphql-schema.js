'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = require('local-logger');
const { makeExecutableSchema } = require('graphql-tools');
const { userTypes, userResolvers } = require('./user/user-schema');

const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const typeDefs = [baseSchema, userTypes];
const resolvers = [userResolvers];

const graphqlSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: { log: e => logger.error(e, `GRAPHQL: ${e.message}`) },
  allowUndefinedInResolve: !_config2.default.graphql.debug,
  resolverValidationOptions: {
    requireResolversForAllFields: _config2.default.graphql.debug
  }
});

module.exports = {
  graphqlSchema
};
import * as config from 'config';
import logger from 'modules/local-logger';
import { makeExecutableSchema } from 'graphql-tools';
import userResolvers from './user/user-resolvers';
import userTypes from './user/user-schema';

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
  allowUndefinedInResolve: !config.graphql.debug,
  resolverValidationOptions: {
    requireResolversForAllFields: config.graphql.debug,
  },
});

export default graphqlSchema;

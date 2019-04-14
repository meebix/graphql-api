"use strict";

var _apolloServer = require("apollo-server");

var _prismaClient = require("./prisma/generated/prisma-client");

var _config = _interopRequireDefault(require("config"));

var _user = require("./models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = (0, _apolloServer.makeExecutableSchema)({
  typeDefs: [_user.types],
  resolvers: { ..._user.resolvers
  }
});
const server = new _apolloServer.ApolloServer({
  schema,
  context: ({
    req
  }) => ({
    req,
    prisma: _prismaClient.prisma
  }),
  playground: true,
  debug: true // validationRules: {},
  // formatError: () => {},
  // formatResponse: () => {},

});
server.listen({
  port: _config.default.get('port')
}).then(({
  url
}) => {
  console.log(`Server is ready at ${url}`);
});
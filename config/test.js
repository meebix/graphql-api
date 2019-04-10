const database = require('../ormconfig');

module.exports = {
  database: Object.assign({}, database, {
    database: 'node_api_test',
  }),
  server: {
    port: 9000,
  },
  auth: {
    jwt: false,
    verifyAccess: false,
  },
  mfa: {
    enableEmails: false,
    enableTexts: false,
    enableCalls: false,
  },
};

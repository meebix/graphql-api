const db = require('../knexfile');

module.exports = {
  database: db.test,
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

const ormConfig = require('./orm');

module.exports = {
  port: process.env.PORT || 8080,
  orm: Object.assign({}, ormConfig, {
    database: 'node_api_test',
  }),
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
  },
  mailer: {
    domain: 'makeitcount.cc',
  },
};

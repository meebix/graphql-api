const database = require('../ormconfig');

module.exports = {
  database,
  auth: {
    jwt: false,
    verifyAccess: false,
  },
  contentSecurityPolicy: {
    // These are for the graphiql interface at /api/docs
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'unpkg.com', 'cdn.jsdelivr.net'],
    styleSrc: ["'self'", "'unsafe-inline'", 'unpkg.com'],
    fontSrc: ["'self'", 'data:'],
    imgSrc: ["'self'", 'data:'],
  },
  mfa: {
    enableEmails: true,
    enableTexts: false,
    enableCalls: false,
  },
  logger: {
    level: 'debug',
  },
};

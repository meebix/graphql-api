const database = require('../ormconfig');

module.exports = {
  database,
  server: {
    port: process.env.PORT || 8080,
    docs: true,
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expireTime: '1h',
    },
    verifyAccess: true,
    confirmable: true,
    lockable: {
      maxAttempts: 5,
    },
    securityQuestions: true,
    tokens: {
      // Expire time is in minutes
      passwordReset: {
        expireTime: 15,
      },
      confirmed: {
        expireTime: 360, // 6 hrs
      },
      unlockAccount: {
        expireTime: 15,
      },
    },
  },
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
  },
  mfa: {
    enableEmails: true,
    enableTexts: true,
    enableCalls: true,
    tokenExpireTime: 15,
  },
  mailer: {
    domain: 'makeitcount.cc',
  },
  graphql: {
    debug: true,
  },
};

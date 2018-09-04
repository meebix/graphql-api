const ormConfig = require('../ormconfig');

module.exports = {
  port: process.env.PORT || 8080,
  orm: ormConfig,
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
    code: {
      expireTime: 30, // minutes
    },
  },
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
  },
  mfa: {
    enableEmails: true,
    enableTexts: true,
    enableCalls: true,
    codeExpireTime: 15,
  },
  mailer: {
    domain: 'makeitcount.cc',
  },
  graphql: {
    docs: true,
    debug: true,
  },
};

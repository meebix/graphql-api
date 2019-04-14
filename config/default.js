module.exports = {
  port: process.env.PORT || 8080,
  graphql: {
    path: '/api',
    playground: false,
    debug: false,
    logger: false,
  },
  auth: {
    enable: true,
    jwt: {
      secret: process.env.JWT_SECRET,
      expireTime: '1h',
    },
    tokens: {
      passwordReset: {
        expireTime: 2, // time in hours
      },
      confirmed: {
        expireTime: 2, // time in hours
      },
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
    sendEmails: true,
  },
  logger: {
    enable: true,
    pretty: false,
  },
};

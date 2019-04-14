module.exports = {
  graphql: {
    playground: true,
    debug: true,
    logger: true,
  },
  auth: {
    enable: false,
    verifyAccess: false,
  },
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'cdn.jsdelivr.net',
    ],
    styleSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
    fontSrc: ["'self'", 'data:'],
    imgSrc: [
      "'self'",
      'data:',
      'cdn.jsdelivr.net',
      'graphcool-playground.netlify.com',
    ],
  },
  mailer: {
    sendEmails: false,
  },
  mfa: {
    enableEmails: true,
    enableTexts: false,
    enableCalls: false,
  },
  logger: {
    level: 'debug',
    pretty: true,
  },
};

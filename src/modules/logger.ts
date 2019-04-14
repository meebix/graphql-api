import pino from 'pino';
import config from 'config';
import path from 'path';
import uuid from 'uuid/v4';

let destination = path.join(process.cwd(), 'logs/app.log');

if (process.env.NODE_ENV !== 'production') {
  destination = pino.destination(1);
}

const defaultLogger = pino(
  {
    name: 'node-graphql',
    level: config.get('logger.level') || 'info',
    enable: config.get('logger.enable'),
    redact: {
      paths: [],
      remove: true,
    },
    prettyPrint: config.get('logger.pretty'),
  },
  destination
);

const logger = defaultLogger.child({
  serializers: {
    req: req => {
      if (!req) {
        return false;
      }

      const whitelistedHeaders = () => {
        const headers = Object.assign({}, req.headers);
        delete headers.authorization;
        return headers;
      };

      return {
        id: uuid(),
        query: req.query,
        params: req.params,
        method: req.method,
        url: req.url,
        body: req.body,
        headers: whitelistedHeaders(),
        httpVersion: req.httpVersion,
        ip: req.ip,
      };
    },
    res: res => {
      if (!res) {
        return false;
      }

      return {
        statusCode: res.statusCode,
        headers: res._headers,
      };
    },
    args: args => {
      const whitelistArgs = Object.assign({}, args);

      delete whitelistArgs.firstName;
      delete whitelistArgs.lastName;
      delete whitelistArgs.email;
      delete whitelistArgs.password;

      return { ...whitelistArgs };
    },
  },
});

export default logger;

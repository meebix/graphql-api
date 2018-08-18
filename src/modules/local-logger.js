import * as bunyan from 'bunyan';
import * as PrettyStream from 'bunyan-prettystream';
import * as config from 'config';
import * as path from 'path';
import * as uuid from 'uuid/v4';

const prettyStdOut = new PrettyStream();
const ringbuffer = new bunyan.RingBuffer({ limit: 100 });

/**
 * Creates a local logger to be used throughout the application
 */
const logger = bunyan.createLogger({
  name: 'node-api',
  level: (config.logger && config.logger.level) || 'info',
  serializers: {
    err: bunyan.stdSerializers.err,
    req(req) {
      if (!req) {
        return false;
      }

      const whitelistedHeaders = () => {
        const headers = Object.assign({}, req.headers);
        delete headers.authorization;
        return headers;
      };

      const whitelistedBody = () => {
        const body = Object.assign({}, req.body);
        delete body.firstName;
        delete body.lastName;
        delete body.email;
        delete body.password;
        delete body.phone;
        return body;
      };

      return ({
        id: uuid(),
        query: req.query,
        params: req.params,
        method: req.method,
        url: req.url,
        user: req.user.uuid,
        body: whitelistedBody(),
        headers: whitelistedHeaders(),
        httpVersion: req.httpVersion,
        ip: req.ip,
      });
    },
    res(res) {
      if (!res) {
        return false;
      }

      return ({
        statusCode: res.statusCode,
        headers: res._headers, // eslint-disable-line
      });
    },
  },
  streams: [
    {
      stream: prettyStdOut.pipe(process.stdout),
      level: 'debug',
    },
    {
      type: 'rotating-file',
      path: path.join(process.cwd(), '/logs/app.log'),
      period: '1d', // daily rotation
      count: 4, // keep 4 back copies
    },
    {
      level: 'trace',
      type: 'raw', // use 'raw' to get raw log record objects
      stream: ringbuffer,
    },
  ],
});

// Expose the ringbugger for when we need it
logger.ringbuffer = ringbuffer;

export default logger;

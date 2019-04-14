"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bunyan = _interopRequireDefault(require("bunyan"));

var _bunyanPrettystream = _interopRequireDefault(require("bunyan-prettystream"));

var _config = _interopRequireDefault(require("config"));

var _path = _interopRequireDefault(require("path"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prettyStdOut = new _bunyanPrettystream.default();
const ringbuffer = new _bunyan.default.RingBuffer({
  limit: 100
});
/**
 * Creates a local logger to be used throughout the application
 */

const logger = _bunyan.default.createLogger({
  name: 'node-api',
  level: _config.default.get('logger.level') || 'info',
  serializers: {
    err: _bunyan.default.stdSerializers.err,

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

      return {
        id: (0, _v.default)(),
        query: req.query,
        params: req.params,
        method: req.method,
        url: req.url,
        user: req.user.uuid,
        body: whitelistedBody(),
        headers: whitelistedHeaders(),
        httpVersion: req.httpVersion,
        ip: req.ip
      };
    },

    res(res) {
      if (!res) {
        return false;
      }

      return {
        statusCode: res.statusCode,
        headers: res._headers // eslint-disable-line

      };
    }

  },
  streams: [{
    stream: prettyStdOut.pipe(process.stdout),
    level: 'debug'
  }, {
    type: 'rotating-file',
    path: _path.default.join(process.cwd(), '/logs/app.log'),
    period: '1d',
    // daily rotation
    count: 4 // keep 4 back copies

  }, {
    level: 'trace',
    type: 'raw',
    // use 'raw' to get raw log record objects
    stream: ringbuffer
  }]
}); // Expose the ringbugger for when we need it


logger.ringbuffer = ringbuffer;
var _default = logger;
exports.default = _default;
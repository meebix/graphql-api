"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pino = _interopRequireDefault(require("pino"));

var _config = _interopRequireDefault(require("config"));

var _path = _interopRequireDefault(require("path"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let destination = _path.default.join(process.cwd(), 'logs/app.log');

if (process.env.NODE_ENV !== 'production') {
  destination = _pino.default.destination(1);
}

const defaultLogger = (0, _pino.default)({
  name: 'node-graphql',
  level: _config.default.has('logger.level') && _config.default.get('logger.level') || 'info',
  enable: _config.default.has('logger.enable') && _config.default.get('logger.enable'),
  redact: {
    paths: [],
    remove: true
  },
  prettyPrint: _config.default.has('logger.pretty') && _config.default.get('logger.pretty')
}, destination);
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
        id: (0, _v.default)(),
        query: req.query,
        params: req.params,
        method: req.method,
        url: req.url,
        body: req.body,
        headers: whitelistedHeaders(),
        httpVersion: req.httpVersion,
        ip: req.ip
      };
    },
    res: res => {
      if (!res) {
        return false;
      }

      return {
        statusCode: res.statusCode,
        headers: res._headers
      };
    },
    args: args => {
      const whitelistArgs = Object.assign({}, args);
      delete whitelistArgs.name;
      delete whitelistArgs.email;
      delete whitelistArgs.password;
      return { ...whitelistArgs
      };
    }
  }
});
var _default = logger;
exports.default = _default;
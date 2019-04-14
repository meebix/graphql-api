"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pino = _interopRequireDefault(require("pino"));

var _config = _interopRequireDefault(require("config"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _pino.default)({
  name: 'node-graphql',
  level: _config.default.get('logger.level') || 'info',
  enable: true,
  redact: {
    paths: [],
    remove: true
  },
  prettyPrint: _config.default.get('logger.pretty')
}, _pino.default.destination(_path.default.join(process.cwd(), 'logs')));
var _default = logger;
exports.default = _default;
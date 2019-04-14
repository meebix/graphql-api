"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("@modules/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolverLogger = (resolve, parent, args, context, info) => {
  _logger.default.info({
    args
  }, `Metadata for resolver: ${info.fieldName}`);

  return resolve();
};

var _default = resolverLogger;
exports.default = _default;
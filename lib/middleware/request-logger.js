"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("@modules/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Logs key information on every request
 *
 * @function
 * @returns {String} - Log line
 */
const requestLogger = () => {
  return (req, res, next) => {
    const startTime = process.hrtime();
    const originalResEnd = res.end;

    _logger.default.info({
      req,
      res
    }, 'Start request');

    res.end = (...args) => {
      const diffTime = process.hrtime(startTime);
      const responseTime = (diffTime[0] * 1e9 + diffTime[1]) / 1e6;

      _logger.default.info({
        responseTime: `${responseTime} ms`
      }, 'End request');

      originalResEnd.apply(res, args);
    };

    next();
  };
};

var _default = requestLogger;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = _interopRequireDefault(require("@middleware/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolverMiddleware = {
  Query: {
    getUser: _authenticate.default
  }
};
var _default = resolverMiddleware;
exports.default = _default;
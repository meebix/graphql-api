"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = void 0;

var _graphqlShield = require("graphql-shield");

var _authenticate = _interopRequireDefault(require("@middleware/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isAuthenticated = (0, _graphqlShield.rule)()(async (parent, args, context, info) => {
  return (0, _authenticate.default)(context);
});
exports.isAuthenticated = isAuthenticated;
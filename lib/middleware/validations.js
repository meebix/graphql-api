"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlShield = require("graphql-shield");

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _user = require("@models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const permissions = (0, _graphqlShield.shield)((0, _lodash.default)(_user.validations));
var _default = permissions;
exports.default = _default;
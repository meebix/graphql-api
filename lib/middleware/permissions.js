"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlShield = require("graphql-shield");

var _lodash = _interopRequireDefault(require("lodash.merge"));

var rules = _interopRequireWildcard(require("@modules/permission-rules"));

var _user = require("@models/user");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const permissions = (0, _graphqlShield.shield)((0, _lodash.default)(_user.permissions), {
  fallbackRule: rules.isAuthenticated
});
var _default = permissions;
exports.default = _default;
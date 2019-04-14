"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlShield = require("graphql-shield");

// import * as rules from './rules';
const permissions = {
  Mutation: {
    registerUser: _graphqlShield.allow,
    loginUser: _graphqlShield.allow
  },
  AuthPayload: {
    token: _graphqlShield.allow
  }
};
var _default = permissions;
exports.default = _default;
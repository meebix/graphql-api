"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlShield = require("graphql-shield");

// import * as rules from './rules';
const permissions = {
  Mutation: {
    email: (0, _graphqlShield.inputRule)(yup => yup.object({
      email: yup.string().email('It has to be an email!').required()
    }))
  }
};
var _default = permissions;
exports.default = _default;
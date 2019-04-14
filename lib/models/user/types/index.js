"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlImport = require("graphql-import");

var _default = (0, _graphqlImport.importSchema)('src/models/user/types/schema.graphql');

exports.default = _default;
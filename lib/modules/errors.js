"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiError = void 0;

var _apolloServerExpress = require("apollo-server-express");

class ApiError {
  constructor({
    type,
    err
  }) {
    const {
      name,
      message,
      ...meta
    } = err;
    this.error = ApiError.errors[type];
    this.message = message || this.error.message;
    this.meta = Object.assign({}, this.error.meta, {
      name,
      ...meta
    });
    return new _apolloServerExpress.ApolloError(this.message, this.error.code, this.meta);
  }

}

exports.ApiError = ApiError;
ApiError.errors = {
  UNAUTHENTICATED: {
    message: 'Unauthenticated',
    code: 'UNAUTHENTICATED',
    meta: {
      level: 'warn'
    }
  },
  INVALID_CREDENTIALS: {
    message: 'Credentials are not valid',
    code: 'INVALID_CREDENTIALS',
    meta: {
      level: 'warn'
    }
  },
  USER_NOT_FOUND: {
    message: 'User was not found',
    code: 'USER_NOT_FOUND',
    meta: {
      level: 'warn'
    }
  }
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("./model");

var _controller = require("./controller");

var _default = { ..._model.resolvers,
  ..._controller.resolvers
};
exports.default = _default;
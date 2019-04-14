"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserId = getUserId;
exports.APP_SECRET = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const APP_SECRET = 'GraphQL-is-aw3some';
exports.APP_SECRET = APP_SECRET;

function getUserId(context) {
  const Authorization = context.req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    const {
      userId
    } = _jsonwebtoken.default.verify(token, APP_SECRET);

    return userId;
  }

  throw new Error('Not authenticated');
}
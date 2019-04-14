"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _argon = _interopRequireDefault(require("argon2"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _errors = require("@modules/errors");

var _logger = _interopRequireDefault(require("@modules/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUser = async (parent, args, context, info) => {
  const user = await context.prisma.user({
    email: args.email
  });

  if (!user) {
    throw new _errors.ApiError('USER_NOT_FOUND');
  }

  _logger.default.info('USER-RESOLVER: Returning user');

  return { ...user
  };
};

const registerUser = async (parent, args, context, info) => {
  _logger.default.info('USER-RESOLVER: Hashing password');

  const password = await _argon.default.hash(args.password, {
    timeCost: 2000,
    memoryCost: 500
  });

  _logger.default.info('USER-RESOLVER: Creating user');

  const user = await context.prisma.createUser({
    name: args.name,
    email: args.email,
    password
  });

  _logger.default.info('USER-RESOLVER: Signing token');

  const token = _jsonwebtoken.default.sign({
    cuid: user.id,
    role: 'user'
  }, _config.default.get('auth.jwt.secret'), {
    expiresIn: _config.default.get('auth.jwt.expireTime')
  });

  return {
    token
  };
};

const loginUser = async (parent, args, context, info) => {
  const user = await context.prisma.user({
    email: args.email
  });
  const valid = await _argon.default.verify(user.password, args.password);

  if (!user || !valid) {
    throw new _errors.ApiError('INVALID_CREDENTIALS');
  }

  _logger.default.info('USER-RESOLVER: Signing token');

  const token = _jsonwebtoken.default.sign({
    userId: user.id
  }, _config.default.get('auth.jwt.secret'));

  return {
    token
  };
};

const resolvers = {
  Query: {
    getUser
  },
  Mutation: {
    registerUser,
    loginUser
  }
};
exports.resolvers = resolvers;
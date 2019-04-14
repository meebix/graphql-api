import { ApolloError } from 'apollo-server-express';

const ERRORS = {
  UNAUTHENTICATED: {
    message: 'Unauthenticated',
    code: 'UNAUTHENTICATED',
    meta: { level: 'warn' },
  },
  UNAUTHORIZED: {
    message: 'Unauthorized',
    code: 'UNAUTHORIZED',
    meta: { level: 'error' },
  },
  INVALID_CREDENTIALS: {
    message: 'Credentials are not valid',
    code: 'INVALID_CREDENTIALS',
    meta: { level: 'warn' },
  },
  EMAIL_FAILURE: {
    message: 'Email was not sent',
    code: 'EMAIL_FAILURE',
    meta: { level: 'error' },
  },
  USER_NOT_FOUND: {
    message: 'User was not found',
    code: 'USER_NOT_FOUND',
    meta: { level: 'warn' },
  },
  ACCOUNT_NOT_CONFIRMED: {
    message: 'User account is not confirmed',
    code: 'ACCOUNT_NOT_CONFIRMED',
    meta: { level: 'error' },
  },
  CONFIRMED_TOKEN_EXPIRED: {
    message: 'Confirmation token has expired',
    code: 'CONFIRMED_TOKEN_EXPIRED',
    meta: { level: 'error' },
  },
  TOKEN_NOT_FOUND: {
    message: 'Account token was not found',
    code: 'TOKEN_NOT_FOUND',
    meta: { level: 'error' },
  },
};

interface Info {
  [propName: string]: any;
}

const ApiError = (type, additionalInfo?: Info) => {
  const { name, message, ...errProperties }: any =
    (additionalInfo && additionalInfo.err) || {};

  const error = ERRORS[type];
  const errMessage = message || error.message;
  const meta = Object.assign({}, error.meta, {
    name,
    ...errProperties,
  });

  return new ApolloError(errMessage, error.code, meta);
};

export default ApiError;

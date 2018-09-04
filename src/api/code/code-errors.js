/**
 * CODE_EXPIRED
 *
 * @description The code was found, but has expired
 * @param {Object} meta - More details about the error
 */
export const CODE_EXPIRED = meta => ({
  name: 'AppError',
  message: 'The code has expired',
  statusCode: 401,
  errors: [{
    statusCode: 401,
    message: 'The code has expired',
    code: 'CODE_EXPIRED',
    meta,
  }],
});

/**
 * INVALID_CODE_TYPE
 *
 * @description The code type specified was invalid
 * @param {Object} meta - More details about the error
 */
export const INVALID_CODE_TYPE = meta => ({
  name: 'AppError',
  message: 'The code type is invalid',
  statusCode: 400,
  errors: [{
    statusCode: 400,
    message: 'The code type is invalid',
    code: 'INVALID_CODE_TYPE',
    meta,
  }],
});

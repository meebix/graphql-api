/**
 * SQUESTION_NOT_FOUND
 *
 * @description The security question was not found in the database
 * @param {Object} meta - More details about the error
 */
export const SQUESTION_NOT_FOUND = meta => ({
  name: 'AppError',
  message: 'The security question was not found',
  statusCode: 400,
  errors: [{
    statusCode: 400,
    message: 'The security question was not found',
    code: 'SQUESTION_NOT_FOUND',
    meta,
  }],
});

/**
 * INVALID_ANSWER_FORMAT
 *
 * @description The answer object format is invalid
 * @param {Object} meta - More details about the error
 */
export const INVALID_ANSWER_FORMAT = {
  name: 'AppError',
  message: 'The answer object format is invalid',
  statusCode: 422,
  errors: [{
    statusCode: 422,
    message: 'The answer object format is invalid',
    code: 'INVALID_ANSWER_FORMAT',
  }],
};

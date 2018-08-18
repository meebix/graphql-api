import * as objectPath from 'object-path';

/**
 * Prepares errors array for the JSON response
 *
 * @description Sets formatted errors on jsonResponse
 * @function
 * @param {Object} err - The error object from Sparkpost
 * @param {Number} statusCode - Status code
 * @param {Array} errors - The errors returned from Sparkpost
 * @returns {Array} - Formatted errors for error response
 */
const setErrors = (err, statusCode, errors) => {
  const result = [];

  errors.forEach((error) => {
    const code = objectPath.get(error, 'code', 'SPARKPOST_ERROR');

    result.push({
      statusCode,
      message: error.description || error.message,
      code,
    });
  });

  return result;
};

/**
 * Format the error according to SparkPost
 *
 * @function
 * @param {Object} err - Error from SparkPost
 * @returns {Object} - Decorated Error object
 */
function sparkPostError(err) {
  const error = err;
  const statusCode = objectPath.get(error, 'statusCode', 500);

  error.statusCode = statusCode;
  error.jsonResponse = setErrors(error, statusCode, error.errors);

  return error;
}

export default sparkPostError;

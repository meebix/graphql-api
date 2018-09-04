import objectPath from 'object-path';

/**
 * Format the error according to Twilio
 *
 * @function
 * @param {Object} err - Error from Twilio
 * @returns {Object} - Decorated Error object
 */
function twilioError(err) {
  const error = err;
  const detail = objectPath.get(error, 'detail', undefined);

  error.statusCode = error.status;
  error.jsonResponse = [{
    statusCode: error.status,
    message: error.message,
    code: error.code,
    meta: {
      moreInfo: error.moreInfo,
      detail,
    },
  }];

  return error;
}

export default twilioError;

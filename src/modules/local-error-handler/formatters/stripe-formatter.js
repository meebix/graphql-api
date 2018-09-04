import objectPath from 'object-path';

/**
 * Format the error according to Stripe Payments API
 *
 * @function
 * @param {Object} err - Error from Stripe
 * @returns {Object} - Decorated Error object
 */
function stripeError(err) {
  const error = err;
  const statusCode = objectPath.get(error, 'statusCode', 500);
  const code = objectPath.get(error, 'code', 'STRIPE_ERROR');
  const param = objectPath.get(error, 'param', undefined);

  error.statusCode = statusCode;
  error.jsonResponse = [{
    statusCode,
    message: error.message,
    code: code.toUpperCase(),
    meta: { param },
  }];

  return error;
}

export default stripeError;

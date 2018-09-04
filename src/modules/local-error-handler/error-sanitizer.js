import { TYPEORM_ERRORS } from 'modules/local-error-constants';

import sparkPostFormatter from './formatters/sparkpost-formatter';
import jwtFormatter from './formatters/jwt-formatter';
import stripeFormatter from './formatters/stripe-formatter';
import defaultFormatter from './formatters/default-formatter';
import typeormFormatter from './formatters/typeorm-formatter';
import twilioFormatter from './formatters/twilio-formatter';

/**
 * Determines the specific library error signature to be formatted
 *
 * @function
 * @param {Object} error - Express.js err
 * @returns {Object} - Formatted error object
 */
function formatError(err) {
  let { name } = err;

  // When err.name is generic or grouping is needed
  if (TYPEORM_ERRORS.includes(err.name)) name = 'TypeormError';
  if (err.name === 'Error' && (err.moreInfo.includes('twilio'))) name = 'TwilioError';
  if (err.name === 'Error' && (err.type && err.type.startsWith('Stripe'))) name = 'StripeError';

  switch (name) {
    case 'AppError':
    case 'ValidationError':
      return err;
    case 'TypeormError':
      return typeormFormatter(err);
    case 'SparkPostError':
      return sparkPostFormatter(err);
    case 'TokenExpiredError':
    case 'JsonWebTokenError':
      return jwtFormatter(err);
    case 'TwilioError':
      return twilioFormatter(err);
    case 'StripeError':
      return stripeFormatter(err);
    default:
      return defaultFormatter(err);
  }
}

export default formatError;

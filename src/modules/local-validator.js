import { validate } from 'class-validator';
import ApiError from 'modules/local-error';

/**
 * Prepares errors array for the JSON response
 *
 * @description Sets formatted errors on jsonResponse
 * @function
 * @param {Array} errors - The errors returned from validation failure
 * @returns {Array} - Formatted errors for error response
 */
const setErrors = (errors) => {
  const result = [];

  errors.forEach((error) => {
    const constraints = Object.entries(error.constraints);

    constraints.forEach((constraint) => {
      const value = constraint[1];

      result.push({
        statusCode: 400,
        message: value,
        code: 'VALIDATION_FAILED',
        meta: { field: error.property },
      });
    });
  });

  return result;
};

/**
 * Runs validation against user inputs
 *
 * @description Runs validations; throws error on validation fail
 * @function
 * @param {Object} entity - The attributes received on req.body from user input
 * @returns {Array} - Validation failures
 */
const validator = async (entity) => {
  const validationErrors = await validate(entity, {
    skipMissingProperties: true,
  });

  if (validationErrors.length) {
    const error = {
      name: 'ValidationError',
      message: 'Failed validations',
      statusCode: 400,
      errors: setErrors(validationErrors),
    };

    throw new ApiError(error);
  }

  return null;
};

export default validator;

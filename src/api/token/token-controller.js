const config = require('config');
const logger = require('local-logger');
const formatError = require('local-error-handler');
const ApiError = require('local-api-error');
const errors = require('local-errors');
const generateToken = require('local-generate-token');
const addMinutes = require('date-fns/add_minutes');
const knex = require('local-orm');

/**
 * Create a token
 *
 * @description Generates token and token attributes, saves to DB
 * @function
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const create = (req, res) => {
  const { uuid, type } = req.body;

  return knex('users')
    .where({ uuid })
    .first()
    .then((entry) => {
      if (!entry) {
        throw new ApiError(errors.USER_NOT_FOUND(entry));
      }

      const values = {
        user_id: entry.id,
        type,
        code: generateToken(),
        expires: addMinutes(new Date(), config.mfa.tokenExpireTime),
      };

      return knex('tokens')
        .save(values);
    })
    .then(() => {
      logger.info({ uuid }, `TOKEN-CTRL.CREATE: Creating ${type.toLowerCase()} token`);
      return res.json({ data: { user: uuid } });
    })
    .catch((error) => {
      const err = formatError(error);

      logger[err.level]({ err: error, response: err }, `TOKEN-CTRL.CREATE: ${err.message}`);
      return res.status(err.statusCode).json({ errors: err.jsonResponse });
    });
};

/**
 * Retrieve a token
 *
 * @description Finds a token for a given user
 * @function
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const find = (req, res) => {
  const { uuid, type, token } = req.body;

  return knex('users')
    .where({ uuid })
    .first()
    .then((entry) => {
      if (!entry) {
        throw new ApiError(errors.USER_NOT_FOUND({ uuid }));
      }

      return entry.id;
    })
    .then((userId) => {
      return token.findOne({ user_id: userId, type, token })
        .orderBy('created_at', 'desc');
    })
    .then((entry) => {
      if (!entry) {
        throw new ApiError(errors.TOKEN_NOT_FOUND({ token }));
      }

      logger.info({ uuid }, 'TOKEN-CTRL.FIND: Token found');
      return res.json({ data: { user: { uuid } } });
    })
    .catch((error) => {
      const err = formatError(error);

      logger[err.level]({ err: error, response: err }, `TOKEN-CTRL.FIND: ${err.message}`);
      return res.status(err.statusCode).json({ errors: err.jsonResponse });
    });
};

module.exports = {
  create,
  find,
};

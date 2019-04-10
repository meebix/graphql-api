'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _typeorm = require('typeorm');

var _User = require('../../entities/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const logger = require('local-logger');
// const formatError = require('local-error-handler');
// const ApiError = require('local-api-error');
// const errors = require('local-errors');
// const generateToken = require('local-generate-token');
// const addMinutes = require('date-fns/add_minutes');

const something = async (req, res) => {
  console.log('XX', _config2.default.database);
  let connection;
  let newUser;

  try {
    connection = await (0, _typeorm.createConnection)(_config2.default.database);
  } catch (error) {
    console.log('ERR X', error);
  }
  const user = {
    uuid: 'b4af1348-d018-4b1a-846d-0ec0e97607d0d',
    email: 'jon@mail.com',
    password: 'welcome123'
  };
  console.log('FKJDLKS', connection);
  try {
    newUser = await connection.getRepository(_User2.default).save(user);
    return res.send(newUser);
  } catch (error) {
    console.log('ERR 2', error);
  }
};

/**
 * Create a token
 *
 * @description Generates token and token attributes, saves to DB
 * @function
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
// const create = (req, res) => {
//   const { uuid, type } = req.body;

//   return knex('users')
//     .where({ uuid })
//     .first()
//     .then((entry) => {
//       if (!entry) {
//         throw new ApiError(errors.USER_NOT_FOUND(entry));
//       }

//       const values = {
//         user_id: entry.id,
//         type,
//         code: generateToken(),
//         expires: addMinutes(new Date(), config.mfa.tokenExpireTime),
//       };

//       return knex('tokens')
//         .save(values);
//     })
//     .then(() => {
//       logger.info({ uuid }, `TOKEN-CTRL.CREATE: Creating ${type.toLowerCase()} token`);
//       return res.json({ data: { user: uuid } });
//     })
//     .catch((error) => {
//       const err = formatError(error);

//       logger[err.level]({ err: error, response: err }, `TOKEN-CTRL.CREATE: ${err.message}`);
//       return res.status(err.statusCode).json({ errors: err.jsonResponse });
//     });
// };

/**
 * Retrieve a token
 *
 * @description Finds a token for a given user
 * @function
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
// const find = (req, res) => {
//   const { uuid, type, token } = req.body;

//   return knex('users')
//     .where({ uuid })
//     .first()
//     .then((entry) => {
//       if (!entry) {
//         throw new ApiError(errors.USER_NOT_FOUND({ uuid }));
//       }

//       return entry.id;
//     })
//     .then((userId) => {
//       return token.findOne({ user_id: userId, type, token })
//         .orderBy('created_at', 'desc');
//     })
//     .then((entry) => {
//       if (!entry) {
//         throw new ApiError(errors.TOKEN_NOT_FOUND({ token }));
//       }

//       logger.info({ uuid }, 'TOKEN-CTRL.FIND: Token found');
//       return res.json({ data: { user: { uuid } } });
//     })
//     .catch((error) => {
//       const err = formatError(error);

//       logger[err.level]({ err: error, response: err }, `TOKEN-CTRL.FIND: ${err.message}`);
//       return res.status(err.statusCode).json({ errors: err.jsonResponse });
//     });
// };

module.exports = {
  something
  // create,
  // find,
};
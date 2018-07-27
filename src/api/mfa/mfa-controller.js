const config = require('config');
const logger = require('local-logger');
const formatError = require('local-error-handler');
const ApiError = require('local-api-error');
const errors = require('local-errors');
const knex = require('local-orm');
const SparkPost = require('sparkpost');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT,
  process.env.TWILIO_TOKEN,
);

const emailClient = new SparkPost(process.env.SPARKPOST_KEY);

/**
 * Multi-factor Authentication: Email
 *
 * @description Sends communication via email for MFA
 * @function
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response {status, data}
 */
const email = (req, res) => {
  const { uuid, options } = req.body;

  if (!config.mfa.enableEmails) return res.json({ data: { user: { uuid } } });

  return knex('users')
    .where({ uuid })
    .first()
    .then((entry) => {
      if (!entry) {
        throw new ApiError(errors.USER_NOT_FOUND(entry));
      }

      return emailClient.transmissions.send({
        campaign_id: options.campaignId,
        metadata: {
          uuid: entry.uuid,
        },
        options: {
          skip_suppression: false,
        },
        content: {
          template_id: options.templateId,
        },
        recipients: [
          {
            address: {
              name: entry.first_name,
              email: entry.email,
            },
            substitution_data: {
              first_name: entry.first_name,
              mfa_code: entry.token, // FIX!
            },
          },
        ],
      });
    })
    .then((data) => {
      logger.info({ campaignId: options.campaignId, data },
        'MFA-CTRL.EMAIL: Email successfully sent');

      return res.json({ data: { user: { uuid } } });
    })
    .catch((error) => {
      const err = formatError(error);

      logger[err.level]({ err: error, response: err }, `MFA-CTRL.EMAIL: ${err.message}`);
      return res.status(err.statusCode).json({ errors: err.jsonResponse });
    });
};

/**
 * Multi-factor Authentication: Text
 *
 * @description Sends communication via text for MFA
 * @function
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response {status, data}
 */
const text = (req, res) => {
  const { uuid, message } = req.body;

  if (!config.mfa.enableTexts) return res.json({ data: { user: { uuid } } });

  return knex('users')
    .where({ uuid })
    .first()
    .then((entry) => {
      if (!entry) {
        throw new ApiError(errors.USER_NOT_FOUND(entry));
      }

      return twilio.messages.create({
        to: '+12016558417',
        from: '+12014742321',
        body: message,
      })
        .then((data) => {
          if (data.error_code) {
            throw new ApiError(data.error_message);
          }

          logger.info({ data },
            'MFA-CTRL.EMAIL: Email successfully sent');

          return res.json({ data: { user: { uuid } } });
        })
        .done();
    })
    .catch((error) => {
      const err = formatError(error);

      logger[err.level]({ err: error, response: err }, `MFA-CTRL.EMAIL: ${err.message}`);
      return res.status(err.statusCode).json({ errors: err.jsonResponse });
    });
};

/**
 * Multi-factor Authentication: Phone
 *
 * @description Sends communication via phone for MFA
 * @function
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response {status, data}
 */
const phone = () => {};

module.exports = {
  email,
  text,
  phone,
};

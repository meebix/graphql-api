import SparkPost from 'sparkpost';
import config from 'config';
import logger from '@modules/logger';
import ApiError from '@modules/errors';

const emailClient = new SparkPost(process.env.SPARKPOST);

/**
 * Send email trasmission
 *
 * @function
 * @param {Object} user - Information about the user
 * @param {Object} options - SparkPost transmission options
 * @param {String} options.campaignId - SparkPost campaign_id
 * @param {String} options.templateId - SparkPost template_id
 * @param {Object} options.substitutionData - SparkPost email template data
 * @returns {Promise}
 */
export const send = (user, options) => {
  if (!config.get('mailer.sendEmails')) {
    return new Promise(resolve => resolve());
  }

  return emailClient.transmissions
    .send({
      campaign_id: options.campaignId,
      metadata: {
        cuid: user.id,
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
            name: user.firstName,
            email: user.email,
          },
          substitution_data: options.substitutionData(user),
        },
      ],
    })
    .then(data => {
      logger.info(
        {
          results: data.results,
          campaignId: options.campaignId,
          templateId: options.templateId,
        },
        `Sent email to user: ${user.id}`
      );
    })
    .catch(err => {
      throw ApiError('EMAIL_FAILURE', { err });
    });
};

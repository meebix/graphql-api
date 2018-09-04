import { getManager } from 'typeorm';
import SparkPost from 'sparkpost';
import Twilio from 'twilio';
import object from 'object-path';
import ApiError from 'modules/local-error';
import errorHandler from 'modules/local-error-handler';
import logger from 'modules/local-logger';

import User from 'entities/user';
import Profile from 'entities/profile';
import CodeType from 'entities/code-type';
import Code from 'entities/code';

import {
  USER_NOT_FOUND,
  PROFILE_NOT_FOUND,
  CODE_NOT_FOUND,
} from 'modules/local-error-constants';

/**
 * Send a code over the multi-factor authentication channel
 *
 * @method POST
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const send = async (req, res) => {
  const { type, code } = req.body;
  const { userId } = req.params;
  const orm = getManager();

  try {
    const user = await orm.findOne(User, { uuid: userId });
    const profile = await orm.findOne(Profile, { user: user.id });
    const codeType = await orm.findOne(CodeType, { name: type });
    const existingCode = await orm
      .createQueryBuilder(Code, 'table')
      .innerJoin('table.user', 'user')
      .innerJoin('table.codeType', 'codeType')
      .where('table.user = :id', { id: user.id })
      .andWhere('table.codeType = :type', { type: codeType.id })
      .andWhere('table.code = :code', { code })
      .andWhere('table.delivered = :delivered', { delivered: false })
      .andWhere('table.used = :used', { used: false })
      .getOne();

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid: userId }));
    if (!profile) throw new ApiError(PROFILE_NOT_FOUND({ user: user.id }));
    if (!existingCode) throw new ApiError(CODE_NOT_FOUND({ code }));

    switch (type) {
      case 'email': {
        const emailClient = new SparkPost(process.env.SPARKPOST_KEY);
        const response = await emailClient.transmissions.send({
          recipients: [
            {
              address: {
                name: profile.firstName,
                email: user.email,
              },
              substitution_data: {
                firstName: profile.firstName,
                code,
              },
            },
          ],
          content: {
            template_id: 'mfa-code',
          },
          metadata: { uuid: user.uuid },
        });

        const id = object.get(response, 'results.id');
        const accepted = object.get(response, 'results.total_accepted_recipients') === 1;
        const rejected = object.get(response, 'results.total_rejected_recipients') === 1;

        if (accepted && !rejected) {
          await orm.update(Code, {
            user,
            codeType,
            code,
            used: false,
          }, { delivered: true, deliveredDate: new Date() });
        }

        logger.info({
          uuid: user.uuid,
          id,
        }, 'MFA-CTRL.SEND: Sending MFA code via email');

        return res.json({ data: { id } });
      }
      case 'text': {
        const twilio = new Twilio(process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN);
        const response = await twilio.messages.create({
          to: `+${profile.phoneCountryCode}${profile.phone}`,
          from: process.env.TWILIO_PHONE,
          body: `Your one-time code is: ${code}`,
        });

        // Assume if no error thrown, message will eventually be successfully sent
        // Would need more sophisticated architecture to ensure sent
        await orm.update(Code, {
          user,
          codeType,
          code,
          used: false,
        }, { delivered: true, deliveredDate: new Date() });

        logger.info({
          uuid: user.uuid,
          sid: response.sid,
          status: response.status,
        }, 'MFA-CTRL.SEND: Sending MFA code via text');

        return res.json({ data: {
          uuid: user.uuid,
          sid: response.sid,
          status: response.status,
        } });
      }
      default:
        break;
    }

    return null;
  } catch (error) {
    return errorHandler({ loggerPrefix: 'MFA-CTRL.SEND', error, req, res });
  }
};

export default { send };

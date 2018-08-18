import * as config from 'config';
import * as compareDates from 'date-fns/compare_asc';
import * as addMinutes from 'date-fns/add_minutes';
import { getManager } from 'typeorm';
import generateToken from 'modules/local-generate-token';
import ApiError from 'modules/local-error';
import errorHandler from 'modules/local-error-handler';
import logger from 'modules/local-logger';

import TokenType from 'entities/token-type';
import Token from 'entities/token';
import User from 'entities/user';

import {
  USER_NOT_FOUND,
  TOKEN_NOT_FOUND,
  TOKEN_EXPIRED,
  INVALID_TOKEN_TYPE,
} from 'modules/local-error-constants';

/**
 * Generate a security token
 *
 * @function
 * @description - Used for MFA, Confirm Account, Locked Account, and Reset Password flows
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
export const generate = async (req, res) => {
  const { uuid, type } = req.body;
  const orm = getManager();

  try {
    const user = await orm.findOne(User, { uuid });
    const tokenType = await orm.findOne(TokenType, { name: type });
    const existingToken = await orm.findOne(Token, {
      user: user.id,
      type: tokenType.id,
      used: false,
    });
    const tokenExpired = existingToken
      && compareDates(new Date(), existingToken.expiryDate) > -1;

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid }));
    if (!tokenType) throw new ApiError(INVALID_TOKEN_TYPE({ type }));
    if (!existingToken || tokenExpired) {
      const token = orm.create(Token, { user, tokenType });
      await orm.save(token);
    } else {
      await orm.update(Token, { id: existingToken.id }, {
        token: generateToken(),
        expiryDate: addMinutes(new Date(), config.auth.tokens.expireTime),
      });
    }
  } catch (error) {
    return errorHandler({ loggerPrefix: 'TOKEN-CTRL.GENERATE', error, req, res });
  }

  logger.info({ uuid, type }, `TOKEN-CTRL.GENERATE: Creating ${type} token`);
  return res.json({ data: { user: uuid } });
};

/**
 * Validate a security token
 *
 * @function
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
export const validate = async (req, res) => {
  const { uuid, type } = req.body;
  const { token } = req.params;
  const orm = getManager();

  try {
    const user = await orm.findOne(User, { uuid });
    const tokenType = await orm.findOne(TokenType, { name: type });
    const existingToken = await orm.findOne(Token, {
      user: user.id,
      type: tokenType.id,
      token,
      used: false,
    });
    const tokenExpired = existingToken
      && compareDates(new Date(), existingToken.expiryDate) > -1;

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid }));
    if (!tokenType) throw new ApiError(INVALID_TOKEN_TYPE({ type }));
    if (!existingToken) throw new ApiError(TOKEN_NOT_FOUND({ type })); // update
    if (tokenExpired) throw new ApiError(TOKEN_EXPIRED({ type }));

    await orm.update(Token, { id: existingToken.id }, { used: true });

    logger.info({ uuid, type }, 'TOKEN-CTRL.VALIDATE: Token validated');
    return res.json({ data: { user: { uuid } } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'TOKEN-CTRL.VALIDATE', error, req, res });
  }
};

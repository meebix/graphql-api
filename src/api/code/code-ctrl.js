import config from 'config';
import compareDates from 'date-fns/compare_asc';
import addMinutes from 'date-fns/add_minutes';
import { getManager } from 'typeorm';
import generateCode from 'modules/local-generate-code';
import ApiError from 'modules/local-error';
import errorHandler from 'modules/local-error-handler';
import logger from 'modules/local-logger';

import CodeType from 'entities/code-type';
import Code from 'entities/code';
import User from 'entities/user';

import { USER_NOT_FOUND, CODE_NOT_FOUND } from 'modules/local-error-constants';
import {
  CODE_EXPIRED,
  INVALID_CODE_TYPE,
} from './code-errors';

/**
 * Generate a security code
 *
 * @method POST
 * @description - Used for MFA, Confirm Account, Locked Account, and Reset Password flows
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const generate = async (req, res) => {
  let returningCode;
  const { uuid, type } = req.body;
  const orm = getManager();

  try {
    const user = await orm.findOne(User, { uuid });
    const codeType = await orm.findOne(CodeType, { name: type });
    const existingCode = await orm
      .createQueryBuilder(Code, 'c')
      .innerJoin('c.user', 'user')
      .innerJoin('c.codeType', 'codeType')
      .where('c.user = :id', { id: user.id })
      .andWhere('c.codeType = :type', { type: codeType.id })
      .andWhere('c.used = :used', { used: false })
      .getOne();
    const codeExpired = existingCode
      && compareDates(new Date(), existingCode.expiryDate) > -1;

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid }));
    if (!codeType) throw new ApiError(INVALID_CODE_TYPE({ type }));

    if (!existingCode || codeExpired) {
      const code = orm.create(Code, { user, codeType });

      await orm.save(Code, code).then(async (saved) => {
        returningCode = await orm
          .createQueryBuilder(Code, 'c')
          .select(['c', 'user.uuid'])
          .innerJoin('c.user', 'user')
          .where('c.id = :id', { id: saved.id })
          .getOne();
      });

      logger.info({ uuid: user.uuid, type }, `CODE-CTRL.GENERATE: Creating ${type} code`);
    } else {
      await orm.update(Code, { id: existingCode.id }, {
        code: generateCode(),
        expiryDate: addMinutes(new Date(), config.auth.code.expireTime),
      });

      returningCode = await orm
        .createQueryBuilder(Code, 'c')
        .select(['c', 'user.uuid'])
        .innerJoin('c.user', 'user')
        .where('c.id = :id', { id: existingCode.id })
        .getOne();

      logger.info({ uuid: user.uuid, type }, `CODE-CTRL.GENERATE: Updating ${type} code`);
    }

    return res.status(201).json({ data: { code: returningCode } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'CODE-CTRL.GENERATE', error, req, res });
  }
};

/**
 * Validate a security code
 *
 * @method PATCH
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const validate = async (req, res) => {
  const { uuid, type } = req.body;
  const { codeId } = req.params;
  const orm = getManager();

  try {
    const user = await orm.findOne(User, { uuid });
    const codeType = await orm.findOne(CodeType, { name: type });
    const existingCode = await orm
      .createQueryBuilder(Code, 'c')
      .innerJoin('c.user', 'user')
      .innerJoin('c.codeType', 'codeType')
      .where('c.user = :id', { id: user.id })
      .andWhere('c.codeType = :type', { type: codeType.id })
      .andWhere('c.code = :code', { code: codeId })
      .andWhere('c.delivered = :delivered', { delivered: true })
      .andWhere('c.used = :used', { used: false })
      .getOne();
    const codeExpired = existingCode
      && compareDates(new Date(), existingCode.expiryDate) > -1;

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid }));
    if (!codeType) throw new ApiError(INVALID_CODE_TYPE({ type }));
    if (!existingCode) throw new ApiError(CODE_NOT_FOUND({ code: codeId }));
    if (codeExpired) throw new ApiError(CODE_EXPIRED({ date: existingCode.expiryDate }));

    await orm.update(Code, { id: existingCode.id }, {
      used: true,
      used_date: new Date(),
    });

    logger.info({ uuid, type }, 'CODE-CTRL.VALIDATE: Code validated');
    return res.json({ data: { user: { uuid } } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'CODE-CTRL.VALIDATE', error, req, res });
  }
};

export default { generate, validate };

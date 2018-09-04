import { getManager } from 'typeorm';
import ApiError from 'modules/local-error';
import errorHandler from 'modules/local-error-handler';
import logger from 'modules/local-logger';

import User from 'entities/user';
import SecurityQuestion from 'entities/security-question';
import SecurityQuestionAnswer from 'entities/security-question-answer';

import {
  MISSING_BODY,
  USER_NOT_FOUND,
} from 'modules/local-error-constants';

import { SQUESTION_NOT_FOUND } from './security-question-errors';

/**
 * Retrieve all security questions and answers for a user
 *
 * @method GET
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const retrieveAll = async (req, res) => {
  const { userId } = req.params;
  const orm = getManager();

  try {
    const user = await orm.findOne(User, { uuid: userId });
    const questions = await orm
      .createQueryBuilder(SecurityQuestionAnswer, 's')
      .select(['s', 'user.uuid', 'question.shortName'])
      .innerJoin('s.user', 'user')
      .innerJoin('s.securityQuestion', 'question')
      .where('s.user = :userId', { userId: user.id })
      .getMany();

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid: userId }));

    logger.info(
      { uuid: user.uuid },
      'SECURITY-QUESTION-CTRL.RETRIEVE-ALL: Security questions retrieved',
    );

    return res.json({ data: { questions } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'SECURITY-QUESTION-CTRL.RETRIEVE-ALL', error, req, res });
  }
};

/**
 * Retrieve a single security question answer
 *
 * @method GET
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const retrieveOne = async (req, res) => {
  const { userId, shortName } = req.params;
  const orm = getManager();

  try {
    const user = await orm.findOne(User, { uuid: userId });
    const securityQuestion = await orm.findOne(SecurityQuestion, { shortName });
    const question = await orm
      .createQueryBuilder(SecurityQuestionAnswer, 's')
      .select(['s', 'user.uuid', 'question.shortName'])
      .innerJoin('s.user', 'user')
      .innerJoin('s.securityQuestion', 'question')
      .where('s.user = :userId', { userId: user.id })
      .andWhere('s.securityQuestion = :question', { question: securityQuestion.id })
      .getOne();

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid: userId }));

    logger.info(
      { uuid: user.uuid, shortName },
      'SECURITY-QUESTION-CTRL.RETRIEVE-ONE: Security question retrieved',
    );

    return res.json({ data: { question } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'SECURITY-QUESTION-CTRL.RETRIEVE-ONE', error, req, res });
  }
};
/**
 * Create security questions and answers for a user
 *
 * @method POST
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const create = async (req, res) => {
  let returningQuestions;
  const { questions } = req.body;
  const { userId } = req.params;
  const orm = getManager();

  if (!questions) throw new ApiError(MISSING_BODY);

  try {
    const user = await orm.findOne(User, { uuid: userId });
    const entries = questions.map(async (entry) => {
      const securityQuestion = await orm.findOne(SecurityQuestion, {
        shortName: entry.question,
      });

      if (!user) throw new ApiError(USER_NOT_FOUND({ uuid: userId }));
      if (!securityQuestion) throw new ApiError(SQUESTION_NOT_FOUND({ question: entry.question }));

      return {
        user,
        securityQuestion,
        answer: entry.answer,
      };
    });

    await Promise.all(entries).then(async (answers) => {
      await orm.save(SecurityQuestionAnswer, answers).then(async () => {
        returningQuestions = await orm
          .createQueryBuilder(SecurityQuestionAnswer, 's')
          .select(['s', 'user.uuid', 'question.shortName'])
          .innerJoin('s.user', 'user')
          .innerJoin('s.securityQuestion', 'question')
          .where('s.user = :userId', { userId: user.id })
          .getMany();
      });
    });

    logger.info({ uuid: user.uuid }, 'SECURITY-QUESTION-CTRL.CREATE: Security questions created');
    return res.status(201).json({ data: { questions: returningQuestions } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'SECURITY-QUESTION-CTRL.CREATE', error, req, res });
  }
};

/**
 * Update a single or set of security questions and answers for a user
 *
 * @method PATCH
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const update = async (req, res) => {
  let returningQuestions;
  const { questions } = req.body;
  const { userId } = req.params;
  const orm = getManager();

  if (!questions) throw new ApiError(MISSING_BODY());

  try {
    const user = await orm.findOne(User, { uuid: userId });
    const entries = questions.map(async (entry) => {
      const securityQuestion = await orm.findOne(SecurityQuestion, { shortName: entry.question });
      const existingEntry = await orm
        .createQueryBuilder(SecurityQuestionAnswer, 's')
        .innerJoin('s.user', 'user')
        .innerJoin('s.securityQuestion', 'securityQuestion')
        .where('s.user = :id', { id: user.id })
        .andWhere('s.securityQuestion = :question', { question: securityQuestion.id })
        .getOne();

      if (!user) throw new ApiError(USER_NOT_FOUND({ uuid: userId }));
      if (!securityQuestion) throw new ApiError(SQUESTION_NOT_FOUND({ question: entry.question }));

      if (entry.answer === existingEntry.answer) return null;
      if (existingEntry) {
        return orm.update(SecurityQuestionAnswer, { user, securityQuestion }, {
          answer: entry.answer,
        });
      }

      return orm.insert(SecurityQuestionAnswer, {
        user,
        securityQuestion,
        answer: entry.answer,
      });
    });

    await Promise.all(entries).then(async () => {
      returningQuestions = await orm
        .createQueryBuilder(SecurityQuestionAnswer, 's')
        .select(['s', 'user.uuid', 'question.shortName'])
        .innerJoin('s.user', 'user')
        .innerJoin('s.securityQuestion', 'question')
        .where('s.user = :userId', { userId: user.id })
        .getMany();
    });

    logger.info({ uuid: user.uuid }, 'SECURITY-QUESTION-CTRL.UPDATE: Security questions updated');
    return res.json({ data: { questions: returningQuestions } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'SECURITY-QUESTION-CTRL.UPDATE', error, req, res });
  }
};

export default { retrieveAll, retrieveOne, create, update };

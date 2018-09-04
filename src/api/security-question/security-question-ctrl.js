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

// TODO: need a validate method here
// should be logging failed attempts

/**
 * Retrieve security questions and answers for a user
 *
 * @method GET
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const retrieve = async (req, res) => {
  const { userId } = req.params;
  const orm = getManager();

  try {
    const user = await orm.findOne(User, { uuid: userId });
    const questions = await orm
      .createQueryBuilder(SecurityQuestionAnswer, 'answer')
      .select(['answer', 'user.uuid', 'question.shortName'])
      .innerJoin('answer.user', 'user')
      .innerJoin('answer.securityQuestion', 'question')
      .where('answer.user = :userId', { userId: user.id })
      .getMany();

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid: userId }));

    logger.info(
      { uuid: user.uuid },
      'SECURITY-QUESTION-CTRL.RETRIEVE: Security questions retrieved',
    );

    return res.json({ data: { questions } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'SECURITY-QUESTION-CTRL.RETRIEVE', error, req, res });
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
          .createQueryBuilder(SecurityQuestionAnswer, 'answer')
          .select(['answer', 'user.uuid', 'question.shortName'])
          .innerJoin('answer.user', 'user')
          .innerJoin('answer.securityQuestion', 'question')
          .where('answer.user = :userId', { userId: user.id })
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
        .createQueryBuilder(SecurityQuestionAnswer, 'table')
        .innerJoin('table.user', 'user')
        .innerJoin('table.securityQuestion', 'securityQuestion')
        .where('table.user = :id', { id: user.id })
        .andWhere('table.securityQuestion = :question', { question: securityQuestion.id })
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
        .createQueryBuilder(SecurityQuestionAnswer, 'answer')
        .select(['answer', 'user.uuid', 'question.shortName'])
        .innerJoin('answer.user', 'user')
        .innerJoin('answer.securityQuestion', 'question')
        .where('answer.user = :userId', { userId: user.id })
        .getMany();
    });

    logger.info({ uuid: user.uuid }, 'SECURITY-QUESTION-CTRL.UPDATE: Security questions updated');
    return res.json({ data: { questions: returningQuestions } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'SECURITY-QUESTION-CTRL.UPDATE', error, req, res });
  }
};

export default { retrieve, create, update };

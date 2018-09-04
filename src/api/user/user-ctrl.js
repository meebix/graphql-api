import { getManager } from 'typeorm';
import ApiError from 'modules/local-error';
import errorHandler from 'modules/local-error-handler';
import logger from 'modules/local-logger';

import User from 'entities/user';

import { USER_NOT_FOUND } from 'modules/local-error-constants';

/**
 * Retrieve a user
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
    const user = await orm
      .createQueryBuilder(User, 'u')
      .select(['u', 'role.name'])
      .innerJoin('u.role', 'role')
      .where('u.uuid = :id', { id: userId })
      .getOne();

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid: userId }));

    logger.info({ uuid: user.uuid }, 'USER-CTRL.RETRIEVE: Found user');
    return res.json({ data: { user } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'USER-CTRL.CREATE', error, req, res });
  }
};

/**
 * Create a user
 *
 * @method POST
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const create = async (req, res) => {
  let returningUser;
  const { email, password } = req.body;
  const orm = getManager();

  try {
    const user = orm.create(User, { email, password });

    await orm.save(user).then(async (saved) => {
      returningUser = await orm
        .createQueryBuilder(User, 'u')
        .select(['u', 'role.name'])
        .innerJoin('u.role', 'role')
        .where('u.id = :id', { id: saved.id })
        .getOne();
    });

    logger.info({ uuid: user.uuid }, 'USER-CTRL.CREATE: Created user');
    return res.status(201).json({ data: { user: returningUser } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'USER-CTRL.CREATE', error, req, res });
  }
};

/**
 * Update a user
 *
 * @method PATCH
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {Object} - JSON response
 */
const update = async (req, res) => {
  let returningUser;
  const { email, password } = req.body;
  const { userId } = req.params;
  const orm = getManager();

  try {
    const user = await orm.findOne(User, { uuid: userId });
    const passwordMatch = await user.comparePassword(password);

    if (!user) throw new ApiError(USER_NOT_FOUND({ uuid: userId }));

    user.email = email;
    if (!passwordMatch) await user.hashPassword(password);

    await orm.save(user).then(async (saved) => {
      returningUser = await orm
        .createQueryBuilder(User, 'u')
        .select(['u', 'role.name'])
        .innerJoin('u.role', 'role')
        .where('u.id = :id', { id: saved.id })
        .getOne();
    });

    logger.info({ uuid: user.uuid }, 'USER-CTRL.UPDATE: User updated');
    return res.json({ data: { user: returningUser } });
  } catch (error) {
    return errorHandler({ loggerPrefix: 'USER-CTRL.UPDATE', error, req, res });
  }
};

export default { retrieve, create, update };

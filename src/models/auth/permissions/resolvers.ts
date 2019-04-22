import { rule } from 'graphql-shield';
import ApiError from '@modules/errors';
import config from 'config';
import isBefore from 'date-fns/is_before';

/**
 * Checks if user account has been confirmed
 *
 * @async
 * @function
 * @param {Object} parent - Parent resolver
 * @param {Object} args - User input arguments
 * @param {Object} context - Global resolver store
 * @param {AST} info - GraphQL metadata
 * @returns {Error|Boolean}
 */
export const accountConfirmed = rule()(async (parent, args, context, info) => {
  if (!config.get('auth.confirmable')) {
    return true;
  }

  const userAccount = await context.prisma
    .user({ email: args.input.email })
    .userAccount();

  if (!userAccount) {
    return ApiError('INVALID_USER_INPUT', { args });
  }

  if (!userAccount.confirmed) {
    return ApiError('ACCOUNT_NOT_CONFIRMED');
  }

  return true;
});

/**
 * Checks if user account confirmation code has expired
 *
 * @async
 * @function
 * @param {Object} parent - Parent resolver
 * @param {Object} args - User input arguments
 * @param {Object} context - Global resolver store
 * @param {AST} info - GraphQL metadata
 * @returns {Error|Boolean}
 */
export const confirmationCodeNotExpired = rule()(
  async (parent, args, context, info) => {
    if (!config.get('auth.confirmable')) {
      return true;
    }

    const userAccount = await context.prisma.userAccount({
      confirmedCode: args.input.code,
    });

    if (!userAccount) {
      throw ApiError('CODE_NOT_FOUND', { code: 'confirmedCode' });
    }

    if (isBefore(userAccount.confirmedExpires, new Date())) {
      return ApiError('CONFIRMED_CODE_EXPIRED');
    }

    return true;
  }
);

/**
 * Checks if user account has been locked
 *
 * @async
 * @function
 * @param {Object} parent - Parent resolver
 * @param {Object} args - User input arguments
 * @param {Object} context - Global resolver store
 * @param {AST} info - GraphQL metadata
 * @returns {Error|Boolean}
 */
export const accountUnlocked = rule()(async (parent, args, context, info) => {
  if (!config.get('auth.lockable.enabled')) {
    return true;
  }

  const userAccount = await context.prisma
    .user({
      email: args.input.email,
    })
    .userAccount();

  if (!userAccount) {
    return ApiError('INVALID_USER_INPUT', { args });
  }

  if (userAccount.locked) {
    throw ApiError('ACCOUNT_LOCKED');
  }

  return true;
});

/**
 * Checks if user account locked code has expired
 *
 * @async
 * @function
 * @param {Object} parent - Parent resolver
 * @param {Object} args - User input arguments
 * @param {Object} context - Global resolver store
 * @param {AST} info - GraphQL metadata
 * @returns {Error|Boolean}
 */
export const lockedCodeNotExpired = rule()(
  async (parent, args, context, info) => {
    const userAccount = await context.prisma.userAccount({
      lockedCode: args.input.code,
    });

    if (!userAccount) {
      throw ApiError('CODE_NOT_FOUND', { code: 'lockedCode' });
    }

    if (isBefore(userAccount.lockedExpires, new Date())) {
      return ApiError('LOCKED_CODE_EXPIRED');
    }

    return true;
  }
);

/**
 * Checks if user account reset password code has expired
 *
 * @async
 * @function
 * @param {Object} parent - Parent resolver
 * @param {Object} args - User input arguments
 * @param {Object} context - Global resolver store
 * @param {AST} info - GraphQL metadata
 * @returns {Error|Boolean}
 */
export const resetPasswordCodeNotExpired = rule()(
  async (parent, args, context, info) => {
    const userAccount = await context.prisma.userAccount({
      resetPasswordCode: args.input.code,
    });

    if (!userAccount) {
      throw ApiError('CODE_NOT_FOUND', { code: 'resetPasswordCode' });
    }

    if (isBefore(userAccount.resetPasswordExpires, new Date())) {
      return ApiError('RESET_PASSWORD_CODE_EXPIRED');
    }

    return true;
  }
);

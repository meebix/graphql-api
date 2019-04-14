import { rule, allow } from 'graphql-shield';
import ApiError from '@modules/errors';
import isBefore from 'date-fns/is_before';
import { isAuthenticated } from '@modules/permission-rules';

const accountConfirmed = rule()(async (parent, args, context, info) => {
  const userAccount = await context.prisma
    .user({ email: args.input.email })
    .userAccount();

  if (!userAccount.confirmed) {
    return ApiError('ACCOUNT_NOT_CONFIRMED');
  }

  return true;
});

const confirmationTokenExpired = rule()(async (parent, args, context, info) => {
  const userAccount = await context.prisma.userAccount({
    confirmedToken: args.token,
  });

  if (!userAccount) {
    throw ApiError('TOKEN_NOT_FOUND', { token: 'confirmedToken' });
  }

  if (isBefore(userAccount.confirmedExpires, new Date())) {
    return ApiError('CONFIRMED_TOKEN_EXPIRED');
  }

  return true;
});

const permissions = {
  Query: {
    getUser: isAuthenticated,
  },
  Mutation: {
    registerUser: allow,
    loginUser: accountConfirmed,
    confirmAccount: confirmationTokenExpired,
  },
  User: {
    id: allow,
  },
  AuthPayload: {
    token: allow,
  },
};

export default permissions;

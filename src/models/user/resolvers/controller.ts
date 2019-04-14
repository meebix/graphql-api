import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import config from 'config';
import addHours from 'date-fns/add_hours';
import ApiError from '@modules/errors';
import logger from '@modules/logger';
import * as mailer from '@modules/mailer/operations';
import * as emails from '@modules/mailer/emails';

const getUser = async (parent, args, context, info) => {
  const user = await context.prisma.user({ email: args.email });

  if (!user) {
    throw ApiError('USER_NOT_FOUND');
  }

  logger.info('USER-RESOLVER: Returning user');
  return { ...user };
};

const registerUser = async (parent, args, context, info) => {
  logger.info('USER-RESOLVER: Hashing password');
  const password = await argon2.hash(args.input.password, {
    timeCost: 2000,
    memoryCost: 500,
  });

  logger.info('USER-RESOLVER: Creating user');
  const user = await context.prisma.createUser({
    firstName: args.input.firstName,
    lastName: args.input.lastName,
    email: args.input.email,
    password,
    userAccount: {
      create: config.get('auth.confirmable')
        ? {
            confirmedToken: String(md5(args.input.email + Math.random())),
            confirmedExpires: String(
              addHours(
                new Date(),
                config.get('auth.tokens.confirmed.expireTime')
              )
            ),
          }
        : {},
    },
  });

  logger.info('USER-RESOLVER: Signing token');
  const token = jwt.sign(
    { cuid: user.id, role: 'user' },
    config.get('auth.jwt.secret'),
    { expiresIn: config.get('auth.jwt.expireTime') }
  );

  const emailType = config.get('auth.confirmable')
    ? 'CONFIRMATION_EMAIL'
    : 'WELCOME_EMAIL';

  logger.info({ emailType }, 'USER-RESOLVER: Sending email');
  await mailer.send(user, emails[emailType]);

  return {
    token,
  };
};

const loginUser = async (parent, args, context, info) => {
  const user = await context.prisma.user({ email: args.input.email });
  const valid = await argon2.verify(user.password, args.input.password);

  if (!user || !valid) {
    throw ApiError('INVALID_CREDENTIALS');
  }

  logger.info('USER-RESOLVER: Signing token');
  const token = jwt.sign({ userId: user.id }, config.get('auth.jwt.secret'));

  return {
    token,
  };
};

const confirmAccount = async (parent, args, context, info) => {
  logger.info('USER-RESOLVER: Confirming account');
  const user = await context.prisma
    .updateUserAccount({
      data: {
        confirmed: true,
        confirmedToken: null,
        confirmedExpires: null,
      },
      where: {
        confirmedToken: args.token,
      },
    })
    .user();

  logger.info('USER-RESOLVER: Sending welcome email');
  await mailer.send(user, emails.WELCOME_EMAIL);

  return null;
};

export const resolvers = {
  Query: { getUser },
  Mutation: { registerUser, loginUser, confirmAccount },
};

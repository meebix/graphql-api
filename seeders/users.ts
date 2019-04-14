import { prisma } from '../src/prisma/generated/prisma-client';
import argon2 from 'argon2';
import md5 from 'md5';
import config from 'config';
import addHours from 'date-fns/add_hours';
import { Chance } from 'chance';

const chance = new Chance();
const seedConfig = {
  numberOfUsers: 5,
};

const users = async () => {
  const password = await argon2.hash('Prisma123', {
    timeCost: 2000,
    memoryCost: 500,
  });

  for (let i = 0; i < seedConfig.numberOfUsers; i++) {
    const email = chance.email();
    const roles = await prisma.roles({ where: { name: 'USER' } });
    const userRole = roles.find(role => role.name === 'USER') as any;

    await prisma.createUser({
      role: { connect: { id: userRole.id } },
      firstName: chance.first(),
      lastName: chance.last(),
      email,
      password,
      phoneCountryCode: '1',
      phone: chance.phone({ formatted: false, country: 'us' }),
      userAccount: {
        create: config.get('auth.confirmable')
          ? {
              confirmedToken: String(md5(email + Math.random())),
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
  }
};

export default users;

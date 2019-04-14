import { prisma } from '../src/prisma/generated/prisma-client';

const seedConfig = {
  numberOfRoles: 1,
};

const roles = async () => {
  for (let i = 0; i < seedConfig.numberOfRoles; i++) {
    await prisma.createRole({ name: 'USER' });
  }
};

export default roles;

import { createConnection } from 'typeorm';
import * as Chance from 'chance';
import * as argon2 from 'argon2';
import User from 'entities/user';
import Role from 'entities/role';
import config from '../config/seed';

const seedUsers = async () => {
  const connection = await createConnection(config);
  const roleEntity = connection.getRepository(Role);
  const userEntity = connection.getRepository(User);
  const numberOfUsers = 2;
  const promises = [];
  const mock = new Chance();

  const userRole = await roleEntity.findOne(1);
  const password = await argon2.hash('Password123', { timeCost: 2000, memoryCost: 500 });

  for (let i = 0; i < numberOfUsers; i++) {
    const user = userEntity.create({
      role: userRole,
      email: mock.email(),
      password,
    });

    promises.push(userEntity.save(user));
  }

  await Promise.all(promises);
  await connection.close();
};

seedUsers();

import { createConnection } from 'typeorm';
import Chance from 'chance';
import argon2 from 'argon2';
import User from 'entities/user';
import config from 'config';

const seedUsers = async () => {
  const connection = await createConnection(config.orm);
  const userEntity = connection.getRepository(User);
  const numberOfUsers = 2;
  const promises = [];
  const mock = new Chance();

  const password = await argon2.hash('Password123', { timeCost: 2000, memoryCost: 500 });

  for (let i = 0; i < numberOfUsers; i++) {
    const user = userEntity.create({
      email: mock.email(),
      password,
    });

    promises.push(userEntity.save(user));
  }

  await Promise.all(promises);
  await connection.close();
};

seedUsers();

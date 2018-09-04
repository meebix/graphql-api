import { createConnection } from 'typeorm';
import Chance from 'chance';
import User from 'entities/user';
import Profile from 'entities/profile';
import config from 'config';

const seedProfiles = async () => {
  const connection = await createConnection(config.orm);
  const userEntity = connection.getRepository(User);
  const profileEntity = connection.getRepository(Profile);
  const promises = [];
  const mock = new Chance();

  const users = await userEntity
    .createQueryBuilder()
    .getMany();

  for (let i = 0; i < users.length; i++) {
    const profile = profileEntity.create({
      user: users[i],
      firstName: mock.first({ nationality: 'en' }),
      lastName: mock.last({ nationality: 'en' }),
      phoneCountryCode: '1',
      phone: mock.phone({ country: 'us', formatted: false }),
    });

    promises.push(profileEntity.save(profile));
  }

  await Promise.all(promises);
  await connection.close();
};

seedProfiles();

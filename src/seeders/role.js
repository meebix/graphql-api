import { createConnection } from 'typeorm';
import Role from 'entities/role';
import config from 'config';

const seedRoles = async () => {
  const connection = await createConnection(config.orm);
  const roleEntity = connection.getRepository(Role);
  const promises = [];
  const roles = ['user'];

  for (let i = 0; i < roles.length; i++) {
    const role = roleEntity.create({ name: roles[i] });
    promises.push(roleEntity.save(role));
  }

  await Promise.all(promises);
  await connection.close();
};

seedRoles();

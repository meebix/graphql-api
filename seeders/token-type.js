import { createConnection } from 'typeorm';
import TokenType from 'entities/token-type';
import config from '../config/seed';

const seedTokenTypes = async () => {
  const connection = await createConnection(config);
  const tokenEntity = connection.getRepository(TokenType);
  const promises = [];
  const tokenTypes = [
    'confirm',
    'unlock',
    'reset_password',
  ];

  for (let i = 0; i < tokenTypes.length; i++) {
    const tokenType = tokenEntity.create({ name: tokenTypes[i] });
    promises.push(tokenEntity.save(tokenType));
  }

  await Promise.all(promises);
  await connection.close();
};

seedTokenTypes();

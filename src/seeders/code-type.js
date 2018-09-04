import { createConnection } from 'typeorm';
import CodeType from 'entities/code-type';
import config from 'config';

const seedCodeTypes = async () => {
  const connection = await createConnection(config.orm);
  const codeEntity = connection.getRepository(CodeType);
  const promises = [];
  const codeTypes = [
    'confirm',
    'unlock',
    'reset_password',
    'email',
    'text',
  ];

  for (let i = 0; i < codeTypes.length; i++) {
    const codeType = codeEntity.create({ name: codeTypes[i] });
    promises.push(codeEntity.save(codeType));
  }

  await Promise.all(promises);
  await connection.close();
};

seedCodeTypes();

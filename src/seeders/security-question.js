import { createConnection } from 'typeorm';
import SecurityQuestion from 'entities/security-question';
import config from 'config';

const seedSecurityQuestions = async () => {
  const connection = await createConnection(config.orm);
  const securityQuestionEntity = connection.getRepository(SecurityQuestion);

  await securityQuestionEntity
    .createQueryBuilder()
    .insert()
    .into(SecurityQuestion)
    .values([
      {
        shortName: 'street_name',
        question: 'What street do you live on?',
      },
      {
        shortName: 'best_friend_name',
        question: 'What is your best friend\'s name?',
      },
    ])
    .execute();

  await connection.close();
};

seedSecurityQuestions();

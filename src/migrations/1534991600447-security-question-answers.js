import { Table } from 'typeorm';

export default class SecurityQuestionAnswers1534991600447 {
  async up(queryRunner) {
    await queryRunner.createTable(new Table({
      columns: [
        {
          generationStrategy: 'increment',
          isGenerated: true,
          isPrimary: true,
          name: 'id',
          type: 'int',
        },
        {
          isNullable: false,
          name: 'user_id',
          type: 'int',
        },
        {
          isNullable: false,
          name: 'question_id',
          type: 'int',
        },
        {
          isNullable: false,
          name: 'answer',
          type: 'varchar',
        },
        {
          default: 'CURRENT_TIMESTAMP',
          isNullable: false,
          name: 'created_at',
          type: 'datetime',
        },
        {
          default: 'CURRENT_TIMESTAMP',
          isNullable: false,
          name: 'updated_at',
          type: 'datetime',
        },
        {
          default: false,
          isNullable: false,
          name: 'deleted',
          type: 'tinyint',
        },
      ],
      name: 'security_question_answers',
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('security_question_answers');
  }
}

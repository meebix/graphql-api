import { Table } from 'typeorm';

export default class SecurityQuestion1534918065132 {
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
          name: 'short_name',
          type: 'varchar',
          length: '45',
          isUnique: true,
        },
        {
          isNullable: false,
          name: 'question',
          type: 'text',
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
      name: 'security_questions',
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('security_questions');
  }
}

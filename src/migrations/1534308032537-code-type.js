import { Table } from 'typeorm';

export default class CodeType1534308032537 {
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
          name: 'name',
          type: 'varchar',
          length: '30',
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
      name: 'code_types',
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('code_types');
  }
}

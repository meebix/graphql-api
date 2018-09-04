import { Table } from 'typeorm';

export default class Code1533958525225 {
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
          name: 'code_type_id',
          type: 'int',
        },
        {
          isNullable: false,
          name: 'code',
          type: 'varchar',
          length: '8',
        },
        {
          isNullable: false,
          name: 'expiry_date',
          type: 'datetime',
        },
        {
          default: false,
          isNullable: false,
          name: 'delivered',
          type: 'tinyint',
        },
        {
          isNullable: true,
          name: 'delivered_date',
          type: 'datetime',
        },
        {
          default: false,
          isNullable: false,
          name: 'used',
          type: 'tinyint',
        },
        {
          isNullable: true,
          name: 'used_date',
          type: 'datetime',
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
      name: 'codes',
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('codes');
  }
}

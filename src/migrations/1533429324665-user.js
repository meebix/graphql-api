import { Table } from 'typeorm';

export default class User1533429324665 {
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
          generationStrategy: 'uuid',
          isGenerated: true,
          isNullable: false,
          name: 'uuid',
          type: 'varchar',
        },
        {
          isNullable: false,
          name: 'role_id',
          type: 'int',
        },
        {
          isNullable: false,
          isUnique: true,
          name: 'email',
          type: 'varchar',
          length: '100',
        },
        {
          isNullable: false,
          name: 'password',
          type: 'varchar',
        },
        {
          default: false,
          isNullable: true,
          name: 'confirmed',
          type: 'tinyint',
        },
        {
          default: false,
          isNullable: true,
          name: 'locked',
          type: 'tinyint',
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
      name: 'users',
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }
}

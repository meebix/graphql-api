import { Table } from 'typeorm';

export default class Profile1534293111545 {
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
          isNullable: true,
          name: 'first_name',
          type: 'varchar',
          length: '80',
        },
        {
          isNullable: true,
          name: 'last_name',
          type: 'varchar',
          length: '80',
        },
        {
          isNullable: true,
          name: 'phone_country_code',
          type: 'varchar',
          length: '5',
        },
        {
          isNullable: true,
          name: 'phone',
          type: 'varchar',
          length: '35',
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
      name: 'profiles',
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('profiles');
  }
}

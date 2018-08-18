import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Profile1534293111545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
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
          name: 'phone',
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
      name: 'profiles',
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('profiles');
  }
}

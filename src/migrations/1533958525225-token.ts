import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Token1533958525225 implements MigrationInterface {
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
          isNullable: false,
          name: 'token_type_id',
          type: 'int',
        },
        {
          isNullable: false,
          name: 'token',
          type: 'int',
        },
        {
          isNullable: false,
          name: 'expiry_date',
          type: 'datetime',
        },
        {
          default: false,
          isNullable: false,
          name: 'used',
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
      name: 'tokens',
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('tokens');
  }
}

exports.up = knex =>
  knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.uuid('uuid').notNull().unique();
    t.integer('role_id').unsigned().notNull();
    t.string('first_name').nullable();
    t.string('last_name').nullable();
    t.string('email').notNull();
    t.string('password').notNull();
    t.string('phone').nullable();
    t.boolean('confirmed').defaultTo(0).notNull();
    t.boolean('locked').defaultTo(0).notNull();
    t.timestamps(true, true);
    t.dateTime('deleted_at').nullable();

    t.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');
    t.index(['uuid', 'email']);
  });

exports.down = knex =>
  knex.schema.dropTable('users');

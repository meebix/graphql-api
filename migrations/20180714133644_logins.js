exports.up = knex =>
  knex.schema.createTable('logins', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('user_id').unsigned().notNull();
    t.string('ip').notNull();
    t.string('user_agent').notNull();
    t.timestamps(true, true);
    t.dateTime('deleted_at').nullable();

    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });

exports.down = knex =>
  knex.schema.dropTable('logins');

exports.up = knex =>
  knex.schema.createTable('tokens', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('user_id').unsigned().notNull();
    t.enu('type', ['MFA', 'CONFIRM', 'UNLOCK', 'RESET']).notNull();
    t.string('code').notNull();
    t.dateTime('expires').notNull();
    t.timestamps(true, true);
    t.dateTime('deleted_at').nullable();

    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });

exports.down = knex =>
  knex.schema.dropTable('tokens');

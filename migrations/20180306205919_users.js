exports.up = knex =>
  knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.string('uid').notNull().unique();
    t.integer('role_id').unsigned().notNull();
    t.string('first_name').notNull();
    t.string('last_name').notNull();
    t.string('email').notNull();
    t.string('password').notNull();
    t.string('street_address').nullable();
    t.string('apt_suite').nullable();
    t.string('city').nullable();
    t.string('state').nullable();
    t.string('zip_code').nullable();
    t.string('company').nullable();
    t.string('title').nullable();
    t.string('blurb', 475).nullable();
    t.dateTime('last_visit').nullable();
    t.string('ip').nullable();
    t.integer('login_attempts').defaultTo(0).notNull();
    t.boolean('confirmed').notNull();
    t.string('confirmed_token').nullable();
    t.dateTime('confirmed_expires').nullable();
    t.string('reset_password_token').nullable();
    t.dateTime('reset_password_expires').nullable();
    t.boolean('account_locked').nullable();
    t.string('unlock_account_token').nullable();
    t.dateTime('unlock_account_expires').nullable();
    t.timestamps(true, true);
    t.dateTime('deleted_at').nullable();

    t.foreign('role_id').references('Roles.id').onDelete('CASCADE');
    t.index(['uid', 'email', 'zip_code', 'title']);
  });

exports.down = knex =>
  knex.schema.dropTable('users');

const database = require('../ormconfig');

module.exports = {
  database: Object.assign({}, database, {
    database: 'node_api_production',
    synchronize: false,
    logging: false,
    entities: [
      'dist/entities/**/*.js',
    ],
    migrations: [
      'dist/migrations/**/*.js',
    ],
    subscribers: [
      'dist/subscribers/**/*.js',
    ],
    cli: {
      entitiesDir: 'dist/entities',
      migrationsDir: 'dist/migrations',
      subscribersDir: 'dist/subscribers',
    },
  }),
  server: {
    docs: false,
  },
  graphql: {
    debug: false,
  },
};

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'node_api_development',
  synchronize: true,
  logging: true,
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
};

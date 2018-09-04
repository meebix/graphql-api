module.exports = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'node_api_development',
  synchronize: false,
  logging: true,
  timezone: '+00:00',
  entities: [
    'dist/entities/**/*.js',
  ],
  subscribers: [
    'dist/subscribers/**/*.js',
  ],
  migrations: [
    'dist/migrations/**/*.js',
  ],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};

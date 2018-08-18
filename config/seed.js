import * as ormconfig from './orm';

export default Object.assign({}, ormconfig, {
  entities: ['src/entities/**/*.ts'],
});

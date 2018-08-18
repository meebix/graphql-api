const ormConfig = require('./orm');

module.exports = {
  orm: Object.assign({}, ormConfig, {
    database: 'node_api_production',
    logging: false,
  }),
  graphql: {
    debug: false,
  },
};

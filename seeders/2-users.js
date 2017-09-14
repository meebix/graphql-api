const User = require('../src/models').user;
const momentDate = require('moment');
const Chance = require('chance');

const numberOfUsers = 10;

module.exports = {
  up() {
    const chance = new Chance();
    const promises = [];

    for (let i = 0; i < numberOfUsers; i++) {
      const promise = User.create({
        role_id: chance.integer({ min: 1, max: 2 }),
        first_name: chance.first(),
        last_name: chance.last(),
        email: chance.email(),
        password: 'password',
        last_visit: momentDate(),
        ip: chance.ip(),
      }, {
        fields: ['uid', 'role_id', 'first_name', 'last_name', 'email', 'password', 'last_visit', 'ip', 'confirmed_token', 'confirmed_expires'],
      });

      promises.push(promise);
    }

    return Promise.all(promises);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('users', null);
  },
};

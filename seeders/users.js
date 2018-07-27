const createUuid = require('uuid/v4');
const argon2 = require('argon2');
const Chance = require('chance');

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Seed "users" database table
 *
 * @description Adds user, admin roles to database
 * @function
 * @param {Object} knex - knex connector
 * @param {Promise} Promise - ES6 native Promise
 */
const seeder = isDevelopment ? (knex, Promise) => {
  const numberOfUsers = 5;

  const chance = new Chance();
  const rows = [];

  return knex.raw('SET foreign_key_checks = 0;')
    .then(() => knex('users').truncate())
    .then(() => argon2.hash('Password123', { timeCost: 2000, memoryCost: 500 }))
    .then((password) => {
      for (let i = 0; i < numberOfUsers; i++) {
        const user = {
          uuid: createUuid(),
          role_id: 1,
          first_name: chance.first(),
          last_name: chance.last(),
          email: chance.email(),
          password,
          phone: chance.phone({ formatted: false, country: 'us' }),
          confirmed: false,
          locked: false,
        };

        rows.push(
          knex('users').insert(user),
        );
      }

      return Promise.all(rows);
    })
    .then(() => knex.raw('SET foreign_key_checks = 1;'))
    .catch((error) => {
      console.log('SEED: Users', error); // eslint-disable-line no-console
    });
} : () => {};

exports.seed = seeder;

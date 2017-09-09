module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_visit: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      ip: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      confirmed: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      confirmed_token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      confirmed_expires: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      reset_password_token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      reset_password_expires: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    queryInterface.addIndex('users', ['last_name', 'email', 'confirmed_token', 'reset_password_token'], {
      indexName: 'UsersIndex',
      indicesType: 'UNIQUE',
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};

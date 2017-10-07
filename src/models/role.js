const v = require('local-validations');

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        required: (value) => {
          v.required(value);
        },
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
    },
  }, {
    underscored: true,
    deletedAt: 'deleted_at',
    paranoid: true,
  });

  return Role;
};

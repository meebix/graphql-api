const bcrypt = require('bcrypt');
const shortId = require('shortid');
const config = require('config');
const logger = require('local-logger');
const md5 = require('md5');
const momentDate = require('moment');
const xss = require('xss');
const difference = require('lodash.difference');
const v = require('local-validations');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: (value) => {
        v.required(value);
      },
      suspicious: (value) => {
        v.suspicious(value);
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.role,
        key: 'id',
      },
      validate: {
        isInt: true,
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
        required: (value) => {
          v.required(value);
        },
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
        required: (value) => {
          v.required(value);
        },
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        required: (value) => {
          v.required(value);
        },
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
      set(val) {
        this.setDataValue('email', val.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        required: (value) => {
          v.required(value);
        },
      },
    },
    last_visit: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isIP: true,
        notEmpty: true,
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isIn: [[true, false]],
        required: (value) => {
          v.required(value);
        },
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
    },
    confirmed_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        len: 32,
        notEmpty: true,
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
    },
    confirmed_expires: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      validate: {
        isDate: true,
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
    },
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: 32,
        notEmpty: true,
        suspicious: (value) => {
          v.suspicious(value);
        },
      },
    },
    reset_password_expires: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      validate: {
        isDate: true,
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

  // Methods
  User.prototype.hashPassword = password => bcrypt.hash(password, 10).then(hash => hash);

  User.prototype.comparePassword = function comparePassword(userPassword) {
    return bcrypt.compare(userPassword, this.password).then(isMatch => isMatch);
  };

  // Hooks
  User.beforeValidate((obj, options) => {
    const user = obj;

    if (user._options.isNewRecord) user.uid = shortId.generate();
    return sequelize.Promise.resolve(options);
  });

  User.afterValidate('sanitize', (obj, options) => {
    const user = obj;
    const skipFields = ['id', 'created_at', 'updated_at', 'deleted_at'];
    const fields = difference(options.fields, skipFields);

    fields.forEach((field) => {
      user[field] = xss(user[field]);
    });

    return sequelize.Promise.resolve(options);
  });

  User.beforeCreate((obj, options) => {
    const user = obj;

    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
          logger.error({
            id: user.uid,
          }, 'MODEL.beforeCreate: Password hash failure');

          return reject(err);
        }

        user.password = hash;
        user.confirmed_token = md5(user.email + Math.random());
        user.confirmed_expires = momentDate().add(config.tokens.confirmed.expireTime, 'h');

        // All users should have role of 'user' by default
        return sequelize.models.role.findOne({ where: { name: 'user' }, attributes: ['id'] })
          .then((role) => {
            user.role_id = role.id;

            return resolve(options);
          });
      });
    });
  });

  // Associations
  User.associate = (models) => {
    User.belongsTo(models.role, { foreignKey: 'role_id' });
  };

  return User;
};

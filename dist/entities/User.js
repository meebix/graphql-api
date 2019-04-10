'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12; /* eslint camelcase: 0 */

var _typeorm = require('typeorm');

var _classValidator = require('class-validator');

var _Role = require('./Role');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

// create a base class
// formatters, transformations

let User = exports.User = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = (0, _typeorm.Column)('varchar'), _dec4 = (0, _typeorm.Generated)('uuid'), _dec5 = (0, _typeorm.Column)({ type: 'varchar', nullable: true }), _dec6 = (0, _classValidator.IsAscii)(), _dec7 = (0, _typeorm.Column)({ type: 'varchar', nullable: true }), _dec8 = (0, _classValidator.IsAscii)(), _dec9 = (0, _typeorm.Column)({ type: 'varchar', unique: true }), _dec10 = (0, _classValidator.IsEmail)(), _dec11 = (0, _typeorm.Column)('varchar'), _dec12 = (0, _classValidator.Length)(10, 128), _dec13 = (0, _typeorm.Column)({ type: 'varchar', nullable: true }), _dec14 = (0, _typeorm.Column)('tinyint'), _dec15 = (0, _typeorm.Column)('tinyint'), _dec16 = (0, _typeorm.Column)({ type: 'datetime', nullable: true }), _dec(_class = (_class2 = class User {
  constructor() {
    _initDefineProp(this, 'id', _descriptor, this);

    _initDefineProp(this, 'uuid', _descriptor2, this);

    _initDefineProp(this, 'first_name', _descriptor3, this);

    _initDefineProp(this, 'last_name', _descriptor4, this);

    _initDefineProp(this, 'email', _descriptor5, this);

    _initDefineProp(this, 'password', _descriptor6, this);

    _initDefineProp(this, 'phone', _descriptor7, this);

    _initDefineProp(this, 'confirmed', _descriptor8, this);

    _initDefineProp(this, 'locked', _descriptor9, this);

    _initDefineProp(this, 'created_at', _descriptor10, this);

    _initDefineProp(this, 'updated_at', _descriptor11, this);

    _initDefineProp(this, 'deleted_at', _descriptor12, this);
  }

  // @ManyToOne(() => Role, role => role.id)
  // role_id = Role;

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'id', [_dec2], {
  enumerable: true,
  initializer: function () {
    return undefined;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'uuid', [_dec3, _dec4], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'first_name', [_dec5, _dec6], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'last_name', [_dec7, _dec8], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'email', [_dec9, _dec10], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'password', [_dec11, _dec12], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'phone', [_dec13], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'confirmed', [_dec14], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'locked', [_dec15], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'created_at', [_typeorm.CreateDateColumn], {
  enumerable: true,
  initializer: function () {
    return undefined;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'updated_at', [_typeorm.UpdateDateColumn], {
  enumerable: true,
  initializer: function () {
    return undefined;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'deleted_at', [_dec16], {
  enumerable: true,
  initializer: function () {
    return undefined;
  }
})), _class2)) || _class);
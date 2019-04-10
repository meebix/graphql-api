'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Role = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4; /* eslint camelcase: 0 */

var _typeorm = require('typeorm');

var _User = require('./User');

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

let Role = exports.Role = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = (0, _typeorm.Column)({ type: 'datetime', nullable: true }), _dec(_class = (_class2 = class Role {
  constructor() {
    _initDefineProp(this, 'id', _descriptor, this);

    _initDefineProp(this, 'created_at', _descriptor2, this);

    _initDefineProp(this, 'updated_at', _descriptor3, this);

    _initDefineProp(this, 'deleted_at', _descriptor4, this);
  }

  // @OneToMany(() => User, user => user.role_id)
  // name = '';

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'id', [_dec2], {
  enumerable: true,
  initializer: function () {
    return undefined;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'created_at', [_typeorm.CreateDateColumn], {
  enumerable: true,
  initializer: function () {
    return undefined;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'updated_at', [_typeorm.UpdateDateColumn], {
  enumerable: true,
  initializer: function () {
    return undefined;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'deleted_at', [_dec3], {
  enumerable: true,
  initializer: function () {
    return undefined;
  }
})), _class2)) || _class);
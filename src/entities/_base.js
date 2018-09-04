import {
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import validator from 'modules/local-orm-validator';

export default class Base {
  @BeforeInsert()
  @BeforeUpdate()
  async validateFields() {
    await validator(this);
  }
}

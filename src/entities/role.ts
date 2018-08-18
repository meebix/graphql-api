import { IsNotEmpty, IsString } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
} from 'typeorm';

import Base from './base';

@Entity({ name: 'roles' })

export default class Role extends Base {
  @Column({ length: '50' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  // Hooks
  @BeforeInsert()
  @BeforeUpdate()
  formatFields() {
    this.name && (this.name = this.name.toLowerCase());
  }
}

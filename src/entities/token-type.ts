import { IsNotEmpty, IsString } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
} from 'typeorm';

import Base from './base';

@Entity({ name: 'token_types' })

export default class TokenType extends Base {
  @Column({ length: '30' })
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

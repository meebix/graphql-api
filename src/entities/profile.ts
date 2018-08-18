import { IsNotEmpty, IsAscii, IsNumber } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Base from './base';
import User from './user';

@Entity({ name: 'profiles' })

export default class Profile extends Base {
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => User, user => user.id, { nullable: false })
  @IsNotEmpty()
  public user: User;

  @Column({ name: 'first_name', length: '80', nullable: true })
  @IsAscii()
  public firstName: string;

  @Column({ name: 'last_name', length: '80', nullable: true })
  @IsAscii()
  public lastName: string;

  @Column({ nullable: true })
  @IsNumber()
  public phone: number;

  // Hooks
  @BeforeInsert()
  @BeforeUpdate()
  formatFields() {
    this.firstName && (this.firstName = this.firstName.toLowerCase());
    this.lastName && (this.lastName = this.lastName.toLowerCase());
  }
}

import { IsNotEmpty, IsAscii, IsEmail, Length, Matches, IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Base from './base';
import Role from './role';

// encryption

@Entity({ name: 'users' })

export default class User extends Base {
  @JoinColumn({ name: 'role_id' })
  @ManyToOne(type => Role, role => role.id, { nullable: false })
  @IsNotEmpty()
  public role: Role;

  @Column({ nullable: false })
  @Generated('uuid')
  @IsUUID('4')
  @IsNotEmpty()
  public uuid: string;

  @Index()
  @Column({ unique: true, length: '100' })
  @IsEmail()
  public email: string;

  @Column({ nullable: false })
  @Length(10, 128)
  @Matches(/^(?=.*[0-9])(.+)$/, { message: 'must contain at least 1 number' })
  @Matches(/^(?=.*[a-z])(.+)$/, { message: 'must contain at least 1 lowercase letter' })
  @Matches(/^(?=.*[A-Z])(.+)$/, { message: 'must contain at least 1 uppercase letter' })
  @IsNotEmpty()
  public password: string;

  @Column({ default: false })
  public confirmed: boolean;

  @Column({ default: false })
  public locked: boolean;
}

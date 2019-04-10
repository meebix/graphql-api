/* eslint camelcase: 0 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { IsAscii, IsEmail, Length } from 'class-validator';

import { Role } from './Role';

// create a base class
// formatters, transformations

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('varchar')
  @Generated('uuid')
  uuid = '';

  // @ManyToOne(() => Role, role => role.id)
  // role_id = Role;

  @Column({ type: 'varchar', nullable: true })
  @IsAscii()
  first_name = '';

  @Column({ type: 'varchar', nullable: true })
  @IsAscii()
  last_name = '';

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email = '';

  @Column('varchar')
  @Length(10, 128)
  password = '';

  @Column({ type: 'varchar', nullable: true })
  phone = '';

  @Column('tinyint')
  confirmed = false;

  @Column('tinyint')
  locked = false;

  @CreateDateColumn
  created_at = undefined;

  @UpdateDateColumn
  updated_at = undefined;

  @Column({ type: 'datetime', nullable: true })
  deleted_at = undefined;
}

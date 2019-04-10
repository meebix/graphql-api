/* eslint camelcase: 0 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { User } from './User';

// create a base class
// formatters, transformations

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id = undefined;

  // @OneToMany(() => User, user => user.role_id)
  // name = '';

  @CreateDateColumn
  created_at = undefined;

  @UpdateDateColumn
  updated_at = undefined;

  @Column({ type: 'datetime', nullable: true })
  deleted_at = undefined;
}

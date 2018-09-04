import { IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator';
import {
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Base from './_base';

@Entity({ name: 'roles' })

export default class Role extends Base {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column({ type: 'varchar', length: '50' })
  @IsString()
  @IsNotEmpty()
  name = undefined;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  @IsNotEmpty()
  createdAt = undefined;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  @IsNotEmpty()
  updatedAt = undefined;

  @Index()
  @Column({
    type: 'tinyint',
    default: false,
  })
  @IsBoolean()
  deleted = undefined;

  @BeforeInsert()
  @BeforeUpdate()
  formatFields() {
    if (this.name) this.name = this.name.toLowerCase();
  }
}

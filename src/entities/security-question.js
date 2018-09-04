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

@Entity({ name: 'security_questions' })

export default class SecurityQuestion extends Base {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column({
    name: 'short_name',
    type: 'varchar',
    length: '45',
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  shortName = undefined;

  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  question = undefined;

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
    if (this.shortName) this.shortName = this.shortName.toLowerCase();
  }
}

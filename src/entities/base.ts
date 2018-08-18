import { IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import validate from 'modules/local-validator';

export default class Base {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  @IsNotEmpty()
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  @IsNotEmpty()
  public updatedAt: Date;

  @Index()
  @Column({
    type: 'tinyint',
    default: false,
    nullable: false,
  })
  @IsBoolean()
  public deleted: boolean;

  // Hooks
  @BeforeInsert()
  @BeforeUpdate()
  async validateFields() {
    await validate(this);
  }
}

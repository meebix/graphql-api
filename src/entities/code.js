import config from 'config';
import addMinutes from 'date-fns/add_minutes';
import generateCode from 'modules/local-generate-code';
import { IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator';
import {
  PrimaryGeneratedColumn,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Base from './_base';
import User from './user';
import CodeType from './code-type';

@Entity({ name: 'codes' })

export default class Code extends Base {
  @PrimaryGeneratedColumn()
  id = undefined;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, user => user.id)
  @IsNotEmpty()
  user = undefined;

  @JoinColumn({ name: 'code_type_id' })
  @ManyToOne(() => CodeType, codeType => codeType.id)
  @IsNotEmpty()
  codeType = undefined;

  @Column({ type: 'varchar', length: '8' })
  @IsString()
  @IsNotEmpty()
  code = undefined;

  @Column({
    name: 'expiry_date',
    type: 'datetime',
  })
  @IsDate()
  @IsNotEmpty()
  expiryDate = undefined;

  @Index()
  @Column({
    type: 'tinyint',
    default: false,
  })
  @IsBoolean()
  delivered = undefined;

  @Column({
    name: 'delivered_date',
    type: 'datetime',
    nullable: true,
  })
  @IsDate()
  deliveredDate = undefined;

  @Index()
  @Column({
    type: 'tinyint',
    default: false,
  })
  @IsBoolean()
  used = undefined;

  @Column({
    name: 'used_date',
    type: 'datetime',
    nullable: true,
  })
  @IsDate()
  usedDate = undefined;

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
  setCode() {
    this.code = generateCode();
  }

  @BeforeInsert()
  setExpires() {
    this.expiryDate = addMinutes(new Date(), config.auth.code.expireTime);
  }
}

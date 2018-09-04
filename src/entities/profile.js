import capitalize from 'lodash.capitalize';
import { IsNotEmpty, IsAscii, IsString, IsDate, IsBoolean } from 'class-validator';
import {
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from 'typeorm';

import Base from './_base';
import User from './user';

@Entity({ name: 'profiles' })

export default class Profile extends Base {
  @PrimaryGeneratedColumn()
  id = undefined;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, user => user.id)
  @IsNotEmpty()
  user = undefined;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: '80',
    nullable: true,
  })
  @IsAscii()
  firstName = undefined;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: '80',
    nullable: true,
  })
  @IsAscii()
  lastName = undefined;

  @Column({
    name: 'phone_country_code',
    type: 'varchar',
    length: '5',
    nullable: true })
  @IsString()
  phoneCountryCode = undefined;

  @Column({ type: 'varchar', length: '35', nullable: true })
  @IsString()
  phone = undefined;

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

  @AfterLoad()
  capitalize() {
    if (this.firstName) this.firstName = capitalize(this.firstName);
    if (this.lastName) this.lastName = capitalize(this.lastName);
  }

  @BeforeInsert()
  @BeforeUpdate()
  formatFields() {
    if (this.firstName) this.firstName = this.firstName.toLowerCase();
    if (this.lastName) this.lastName = this.lastName.toLowerCase();
  }
}

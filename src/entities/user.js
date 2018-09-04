import argon2 from 'argon2';

import {
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
  IsUUID,
  IsDate,
  IsInt,
} from 'class-validator';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  getManager,
} from 'typeorm';

import Base from './_base';
import Role from './role';

// TODO: encryption

@Entity({ name: 'users' })

export default class User extends Base {
  @PrimaryGeneratedColumn()
  id = undefined;

  @JoinColumn({ name: 'role_id' })
  @ManyToOne(() => Role, role => role.id, { eager: true })
  @IsNotEmpty()
  role = undefined;

  @Column({ type: 'varchar' })
  @Generated('uuid')
  @IsUUID('4')
  @IsNotEmpty()
  uuid = undefined;

  @Index()
  @Column({ type: 'varchar', unique: true, length: '100' })
  @IsEmail()
  email = undefined;

  @Column({ type: 'varchar' })
  @Length(10, 128)
  @Matches(/^(?=.*[0-9])(.+)$/, { message: 'must contain at least 1 number' })
  @Matches(/^(?=.*[a-z])(.+)$/, { message: 'must contain at least 1 lowercase letter' })
  @Matches(/^(?=.*[A-Z])(.+)$/, { message: 'must contain at least 1 uppercase letter' })
  @IsNotEmpty()
  password = undefined;

  @Column({
    type: 'tinyint',
    default: false,
  })
  @IsInt()
  confirmed = undefined;

  @Column({
    type: 'tinyint',
    default: false,
  })
  @IsInt()
  locked = undefined;

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
  @IsInt()
  deleted = undefined;

  async comparePassword(password) {
    const passwordMatch = await argon2.verify(this.password, password);

    return passwordMatch;
  }

  @BeforeInsert()
  async hashPassword(password = this.password) {
    const hashedPassword = await argon2.hash(
      password,
      { timeCost: 2000, memoryCost: 500 },
    );

    this.password = hashedPassword;
  }

  @BeforeInsert()
  async setDefaultRole() {
    const role = await getManager().findOne(Role, { name: 'user' });
    this.role = role;
  }
}

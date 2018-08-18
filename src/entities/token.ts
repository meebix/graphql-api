import * as config from 'config';
import * as addMinutes from 'date-fns/add_minutes';
import generateToken from 'modules/local-generate-token';
import { IsNotEmpty, IsInt, IsDate, IsBoolean } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';

import Base from './base';
import User from './user';
import TokenType from './token-type';

@Entity({ name: 'tokens' })

export default class Token extends Base {
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => User, user => user.id, { nullable: false })
  @IsNotEmpty()
  public user: User;

  @JoinColumn({ name: 'token_type_id' })
  @ManyToOne(type => TokenType, tokenType => tokenType.id, { nullable: false })
  @IsNotEmpty()
  public tokenType: TokenType;

  @Column({ type: 'int' })
  @IsInt()
  @IsNotEmpty()
  public token: number;

  @Column({
    name: 'expiry_date',
    type: 'datetime',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  public expiryDate: Date;

  @Index()
  @Column({
    type: 'tinyint',
    default: false,
    nullable: false,
  })
  @IsBoolean()
  public used: boolean;

  // Hooks
  @BeforeInsert()
  setToken() {
    this.token = generateToken();
  }

  @BeforeInsert()
  setExpires() {
    this.expiryDate = addMinutes(new Date(), (<any>config).auth.tokens.expireTime);
  }
}

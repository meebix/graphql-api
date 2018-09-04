import { IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator';
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
} from 'typeorm';

import Base from './_base';
import User from './user';
import SecurityQuestion from './security-question';

@Entity({ name: 'security_question_answers' })

export default class SecurityQuestionAnswer extends Base {
  @PrimaryGeneratedColumn()
  id = undefined;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, user => user.id)
  @IsNotEmpty()
  user = undefined;

  @JoinColumn({ name: 'question_id' })
  @ManyToOne(() => SecurityQuestion, question => question.id, { eager: true })
  @IsNotEmpty()
  securityQuestion = undefined;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  answer = undefined;

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
    if (this.answer) this.answer = this.answer.toLowerCase();
  }
}

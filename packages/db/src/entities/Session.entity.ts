import { Entity, PrimaryKey, Property, ManyToOne, Index } from '@mikro-orm/core';
import { User } from './User.entity.js';

@Entity({ tableName: 'sessions' })
export class Session {
  @PrimaryKey()
  id!: number;

  @Property({ length: 255, unique: true, fieldName: 'session_token' })
  @Index()
  sessionToken!: string;

  @ManyToOne(() => User, { fieldName: 'user_id' })
  user!: User;

  @Property()
  expires!: Date;
}

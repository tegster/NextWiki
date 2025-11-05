import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './User.entity.js';

@Entity({ tableName: 'accounts' })
export class Account {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User, { fieldName: 'user_id' })
  user!: User;

  @Property({ length: 255 })
  type!: string;

  @Property({ length: 255 })
  provider!: string;

  @Property({ length: 255, fieldName: 'provider_account_id' })
  providerAccountId!: string;

  @Property({ type: 'text', nullable: true, fieldName: 'refresh_token' })
  refreshToken?: string;

  @Property({ type: 'text', nullable: true, fieldName: 'access_token' })
  accessToken?: string;

  @Property({ nullable: true, fieldName: 'expires_at' })
  expiresAt?: number;

  @Property({ length: 255, nullable: true, fieldName: 'token_type' })
  tokenType?: string;

  @Property({ length: 255, nullable: true })
  scope?: string;

  @Property({ type: 'text', nullable: true, fieldName: 'id_token' })
  idToken?: string;

  @Property({ length: 255, nullable: true, fieldName: 'session_state' })
  sessionState?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

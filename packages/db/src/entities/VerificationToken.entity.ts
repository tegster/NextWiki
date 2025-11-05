import { Entity, PrimaryKey, Property, Index, Embeddable } from '@mikro-orm/core';

@Entity({ tableName: 'verification_tokens' })
@Index({ name: 'verification_token_idx', properties: ['identifier', 'token'] })
export class VerificationToken {
  @PrimaryKey({ type: 'string', length: 255 })
  identifier!: string;

  @PrimaryKey({ type: 'string', length: 255 })
  token!: string;

  @Property({ type: 'datetime' })
  expires!: Date;
}

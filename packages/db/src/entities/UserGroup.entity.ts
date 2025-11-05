import { Entity, ManyToOne, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { User } from './User.entity.js';
import { Group } from './Group.entity.js';

@Entity({ tableName: 'user_groups' })
@Index({ name: 'user_group_idx', properties: ['user', 'group'] })
export class UserGroup {
  @PrimaryKey()
  @ManyToOne(() => User, { fieldName: 'user_id', primary: true })
  user!: User;

  @PrimaryKey()
  @ManyToOne(() => Group, { fieldName: 'group_id', primary: true })
  group!: Group;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();
}

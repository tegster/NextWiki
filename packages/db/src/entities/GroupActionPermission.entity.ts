import { Entity, ManyToOne, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { Group } from './Group.entity.js';
import { Action } from './Action.entity.js';

@Entity({ tableName: 'group_action_permissions' })
@Index({ name: 'group_action_permissions_idx', properties: ['group', 'action'] })
export class GroupActionPermission {
  @PrimaryKey()
  @ManyToOne(() => Group, { fieldName: 'group_id', primary: true })
  group!: Group;

  @PrimaryKey()
  @ManyToOne(() => Action, { fieldName: 'action_id', primary: true })
  action!: Action;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();
}

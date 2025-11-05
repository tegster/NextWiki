import { Entity, ManyToOne, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { Group } from './Group.entity.js';
import { Permission } from './Permission.entity.js';

@Entity({ tableName: 'group_permissions' })
@Index({ name: 'group_permission_idx', properties: ['group', 'permission'] })
export class GroupPermission {
  @PrimaryKey()
  @ManyToOne(() => Group, { fieldName: 'group_id', primary: true })
  group!: Group;

  @PrimaryKey()
  @ManyToOne(() => Permission, { fieldName: 'permission_id', primary: true })
  permission!: Permission;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();
}

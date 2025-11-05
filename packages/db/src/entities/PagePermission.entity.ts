import { Entity, PrimaryKey, Property, ManyToOne, Index } from '@mikro-orm/core';
import { WikiPage } from './WikiPage.entity.js';
import { Group } from './Group.entity.js';
import { Permission } from './Permission.entity.js';

@Entity({ tableName: 'page_permissions' })
@Index({ name: 'page_group_perm_idx', properties: ['page', 'permission', 'group'] })
export class PagePermission {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => WikiPage, { fieldName: 'page_id' })
  page!: WikiPage;

  @ManyToOne(() => Group, { fieldName: 'group_id', nullable: true })
  group?: Group;

  @ManyToOne(() => Permission, { fieldName: 'permission_id' })
  permission!: Permission;

  @Property({ length: 10, default: 'allow', fieldName: 'permission_type' })
  permissionType: string = 'allow';

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();
}

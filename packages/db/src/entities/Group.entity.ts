import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { UserGroup } from './UserGroup.entity.js';
import { GroupPermission } from './GroupPermission.entity.js';
import { PagePermission } from './PagePermission.entity.js';
import { GroupModulePermission } from './GroupModulePermission.entity.js';
import { GroupActionPermission } from './GroupActionPermission.entity.js';

@Entity({ tableName: 'groups' })
export class Group {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100, unique: true })
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ fieldName: 'is_system', default: false })
  isSystem: boolean = false;

  @Property({ fieldName: 'is_editable', default: true })
  isEditable: boolean = true;

  @Property({ fieldName: 'allow_user_assignment', default: true })
  allowUserAssignment: boolean = true;

  // Relations
  @OneToMany(() => UserGroup, (userGroup) => userGroup.group)
  userGroups = new Collection<UserGroup>(this);

  @OneToMany(() => GroupPermission, (gp) => gp.group)
  groupPermissions = new Collection<GroupPermission>(this);

  @OneToMany(() => PagePermission, (pp) => pp.group)
  pagePermissions = new Collection<PagePermission>(this);

  @OneToMany(() => GroupModulePermission, (gmp) => gmp.group)
  groupModulePermissions = new Collection<GroupModulePermission>(this);

  @OneToMany(() => GroupActionPermission, (gap) => gap.group)
  groupActionPermissions = new Collection<GroupActionPermission>(this);
}

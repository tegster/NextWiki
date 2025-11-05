import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Permission } from './Permission.entity.js';
import { GroupActionPermission } from './GroupActionPermission.entity.js';

@Entity({ tableName: 'actions' })
export class Action {
  @PrimaryKey()
  id!: number;

  @Property({ length: 50, unique: true })
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  // Relations
  @OneToMany(() => Permission, (permission) => permission.action)
  permissions = new Collection<Permission>(this);

  @OneToMany(() => GroupActionPermission, (gap) => gap.action)
  groupActionPermissions = new Collection<GroupActionPermission>(this);
}

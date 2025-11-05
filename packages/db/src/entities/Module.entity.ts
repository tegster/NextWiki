import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Permission } from './Permission.entity.js';
import { GroupModulePermission } from './GroupModulePermission.entity.js';

@Entity({ tableName: 'modules' })
export class Module {
  @PrimaryKey()
  id!: number;

  @Property({ length: 50, unique: true })
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  // Relations
  @OneToMany(() => Permission, (permission) => permission.module)
  permissions = new Collection<Permission>(this);

  @OneToMany(() => GroupModulePermission, (gmp) => gmp.module)
  groupModulePermissions = new Collection<GroupModulePermission>(this);
}

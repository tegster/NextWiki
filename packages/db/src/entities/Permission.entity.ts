import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
  Unique,
} from '@mikro-orm/core';
import { Module } from './Module.entity.js';
import { Action } from './Action.entity.js';
import { GroupPermission } from './GroupPermission.entity.js';
import { PagePermission } from './PagePermission.entity.js';

@Entity({ tableName: 'permissions' })
@Unique({ name: 'permission_uniq_idx', properties: ['module', 'resource', 'action'] })
export class Permission {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Module, { fieldName: 'module_id' })
  module!: Module;

  @Property({ length: 50 })
  resource!: string;

  @ManyToOne(() => Action, { fieldName: 'action_id' })
  action!: Action;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  // Relations
  @OneToMany(() => GroupPermission, (gp) => gp.permission)
  groupPermissions = new Collection<GroupPermission>(this);

  @OneToMany(() => PagePermission, (pp) => pp.permission)
  pagePermissions = new Collection<PagePermission>(this);
}

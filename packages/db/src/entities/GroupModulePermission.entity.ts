import { Entity, ManyToOne, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { Group } from './Group.entity.js';
import { Module } from './Module.entity.js';

@Entity({ tableName: 'group_module_permissions' })
@Index({ name: 'group_module_permissions_idx', properties: ['group', 'module'] })
export class GroupModulePermission {
  @PrimaryKey()
  @ManyToOne(() => Group, { fieldName: 'group_id', primary: true })
  group!: Group;

  @PrimaryKey()
  @ManyToOne(() => Module, { fieldName: 'module_id', primary: true })
  module!: Module;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();
}

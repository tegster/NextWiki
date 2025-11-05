import { Entity, PrimaryKey, Property, OneToMany, Collection, Index } from '@mikro-orm/core';
import { SettingsHistory } from './SettingsHistory.entity.js';
import type { SettingKey } from '@repo/types';

@Entity({ tableName: 'settings' })
export class Setting {
  @PrimaryKey({ length: 100 })
  @Index({ name: 'settings_key_idx' })
  key!: SettingKey;

  @Property({ type: 'jsonb' })
  value!: any;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // Relations
  @OneToMany(() => SettingsHistory, (history) => history.setting)
  history = new Collection<SettingsHistory>(this);
}

import { Entity, PrimaryKey, Property, ManyToOne, Index } from '@mikro-orm/core';
import { Setting } from './Setting.entity.js';
import { User } from './User.entity.js';
import type { SettingKey } from '@repo/types';

@Entity({ tableName: 'settings_history' })
export class SettingsHistory {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Setting, { fieldName: 'setting_key' })
  @Index({ name: 'settings_history_key_idx' })
  setting!: Setting;

  @Property({ type: 'jsonb', nullable: true, fieldName: 'previous_value' })
  previousValue?: any;

  @ManyToOne(() => User, { nullable: true, fieldName: 'changed_by_id' })
  @Index({ name: 'settings_history_user_idx' })
  changedBy?: User;

  @Property({ fieldName: 'changed_at' })
  @Index({ name: 'settings_history_time_idx' })
  changedAt: Date = new Date();

  @Property({ type: 'text', nullable: true, fieldName: 'change_reason' })
  changeReason?: string;
}

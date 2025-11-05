import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  Index,
} from '@mikro-orm/core';
import { Account } from './Account.entity.js';
import { Session } from './Session.entity.js';
import { WikiPage } from './WikiPage.entity.js';
import { UserGroup } from './UserGroup.entity.js';
import { Asset } from './Asset.entity.js';
import { WikiPageRevision } from './WikiPageRevision.entity.js';
import { SettingsHistory } from './SettingsHistory.entity.js';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ length: 255, nullable: true })
  name?: string;

  @Property({ length: 255, unique: true })
  @Index({ name: 'email_idx' })
  email!: string;

  @Property({ length: 255, nullable: true })
  password?: string;

  @Property({ nullable: true, fieldName: 'email_verified' })
  emailVerified?: Date;

  @Property({ type: 'text', nullable: true })
  image?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // Relations
  @OneToMany(() => Account, (account) => account.user)
  accounts = new Collection<Account>(this);

  @OneToMany(() => Session, (session) => session.user)
  sessions = new Collection<Session>(this);

  @OneToMany(() => WikiPage, (page) => page.createdBy)
  createdWikiPages = new Collection<WikiPage>(this);

  @OneToMany(() => WikiPage, (page) => page.updatedBy)
  updatedWikiPages = new Collection<WikiPage>(this);

  @OneToMany(() => WikiPage, (page) => page.lockedBy)
  lockedWikiPages = new Collection<WikiPage>(this);

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user)
  userGroups = new Collection<UserGroup>(this);

  @OneToMany(() => Asset, (asset) => asset.uploadedBy)
  uploadedAssets = new Collection<Asset>(this);

  @OneToMany(() => WikiPageRevision, (revision) => revision.createdBy)
  pageRevisions = new Collection<WikiPageRevision>(this);

  @OneToMany(() => SettingsHistory, (history) => history.changedBy)
  settingsHistory = new Collection<SettingsHistory>(this);
}

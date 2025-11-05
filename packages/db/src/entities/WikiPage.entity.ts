import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
  Index,
  Enum,
} from '@mikro-orm/core';
import { User } from './User.entity.js';
import { WikiPageRevision } from './WikiPageRevision.entity.js';
import { WikiPageToTag } from './WikiPageToTag.entity.js';
import { AssetToPage } from './AssetToPage.entity.js';
import { PagePermission } from './PagePermission.entity.js';

export enum EditorType {
  MARKDOWN = 'markdown',
  HTML = 'html',
}

@Entity({ tableName: 'wiki_pages' })
export class WikiPage {
  @PrimaryKey()
  id!: number;

  @Property({ length: 1000, unique: true })
  path!: string;

  @Property({ length: 255 })
  @Index({ name: 'trgm_idx_title' })
  title!: string;

  @Property({ type: 'text', nullable: true })
  content?: string;

  @Property({ type: 'text', nullable: true, fieldName: 'rendered_html' })
  renderedHtml?: string;

  @Enum({ items: () => EditorType, nullable: true, fieldName: 'editor_type' })
  editorType?: EditorType;

  @Property({ default: false, fieldName: 'is_published' })
  isPublished: boolean = false;

  @ManyToOne(() => User, { fieldName: 'created_by_id' })
  createdBy!: User;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @ManyToOne(() => User, { fieldName: 'updated_by_id' })
  updatedBy!: User;

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ nullable: true, fieldName: 'rendered_html_updated_at' })
  renderedHtmlUpdatedAt?: Date;

  @ManyToOne(() => User, { nullable: true, fieldName: 'locked_by_id' })
  lockedBy?: User;

  @Property({ nullable: true, fieldName: 'locked_at' })
  lockedAt?: Date;

  @Property({ nullable: true, fieldName: 'lock_expires_at' })
  lockExpiresAt?: Date;

  // Generated column for full-text search (will be handled by migration)
  @Property({ type: 'tsvector', nullable: true, persist: false })
  @Index({ name: 'idx_search', type: 'gin' })
  search?: string;

  // Relations
  @OneToMany(() => WikiPageRevision, (revision) => revision.page)
  revisions = new Collection<WikiPageRevision>(this);

  @OneToMany(() => WikiPageToTag, (pageToTag) => pageToTag.page)
  tags = new Collection<WikiPageToTag>(this);

  @OneToMany(() => AssetToPage, (assetToPage) => assetToPage.page)
  assets = new Collection<AssetToPage>(this);

  @OneToMany(() => PagePermission, (pp) => pp.page)
  pagePermissions = new Collection<PagePermission>(this);
}

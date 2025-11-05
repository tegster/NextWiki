import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { WikiPage } from './WikiPage.entity.js';
import { User } from './User.entity.js';

@Entity({ tableName: 'wiki_page_revisions' })
export class WikiPageRevision {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => WikiPage, { fieldName: 'page_id' })
  page!: WikiPage;

  @Property({ type: 'text' })
  content!: string;

  @ManyToOne(() => User, { nullable: true, fieldName: 'created_by_id' })
  createdBy?: User;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();
}

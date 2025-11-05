import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { WikiPageToTag } from './WikiPageToTag.entity.js';

@Entity({ tableName: 'wiki_tags' })
export class WikiTag {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100, unique: true })
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  // Relations
  @OneToMany(() => WikiPageToTag, (pageToTag) => pageToTag.tag)
  pages = new Collection<WikiPageToTag>(this);
}

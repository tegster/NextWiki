import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { WikiPage } from './WikiPage.entity.js';
import { WikiTag } from './WikiTag.entity.js';

@Entity({ tableName: 'wiki_page_to_tag' })
export class WikiPageToTag {
  @PrimaryKey()
  @ManyToOne(() => WikiPage, { fieldName: 'page_id', primary: true })
  page!: WikiPage;

  @PrimaryKey()
  @ManyToOne(() => WikiTag, { fieldName: 'tag_id', primary: true })
  tag!: WikiTag;
}

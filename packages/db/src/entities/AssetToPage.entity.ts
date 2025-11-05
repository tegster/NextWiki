import { Entity, ManyToOne, PrimaryKey, Index } from '@mikro-orm/core';
import { Asset } from './Asset.entity.js';
import { WikiPage } from './WikiPage.entity.js';

@Entity({ tableName: 'assets_to_pages' })
@Index({ name: 'asset_page_idx', properties: ['asset', 'page'] })
export class AssetToPage {
  @PrimaryKey()
  @ManyToOne(() => Asset, { fieldName: 'asset_id', primary: true })
  asset!: Asset;

  @PrimaryKey()
  @ManyToOne(() => WikiPage, { fieldName: 'page_id', primary: true })
  page!: WikiPage;
}

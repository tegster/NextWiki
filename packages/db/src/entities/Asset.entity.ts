import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { User } from './User.entity.js';
import { AssetToPage } from './AssetToPage.entity.js';

@Entity({ tableName: 'assets' })
export class Asset {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ length: 255, nullable: true })
  name?: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ length: 255, fieldName: 'file_name' })
  fileName!: string;

  @Property({ length: 100, fieldName: 'file_type' })
  fileType!: string;

  @Property({ fieldName: 'file_size' })
  fileSize!: number;

  @Property({ type: 'text' })
  data!: string; // Base64 encoded file data

  @ManyToOne(() => User, { fieldName: 'uploaded_by_id' })
  uploadedBy!: User;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  // Relations
  @OneToMany(() => AssetToPage, (assetToPage) => assetToPage.asset)
  pages = new Collection<AssetToPage>(this);
}

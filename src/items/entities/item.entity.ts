import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Listing } from './listing.entity';
import { Comment } from './comment.entity';
import { AsbtractEntity } from 'src/database/abstract.entity';
import { Tag } from './tag-entity';

@Entity('items')
export class Item extends AsbtractEntity<Item> {
  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  //Setup foreign key
  @OneToOne((type) => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  @OneToMany((type) => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];
}

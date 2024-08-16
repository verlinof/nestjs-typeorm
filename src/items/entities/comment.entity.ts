import { AsbtractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Comment extends AsbtractEntity<Comment> {
  @Column()
  content: string;

  @ManyToOne((type) => Item, (item) => item.comments)
  item: Item;
}

import { AsbtractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tag extends AsbtractEntity<Tag> {
  @Column()
  content: string;
}

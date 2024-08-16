import { AsbtractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Listing extends AsbtractEntity<Listing> {
  @Column()
  description: string;

  @Column()
  rating: number;
}

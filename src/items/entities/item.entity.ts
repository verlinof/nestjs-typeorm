import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  // Akan menerima objek baru dari ItemService
  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}

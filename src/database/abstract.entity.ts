import { PrimaryGeneratedColumn } from 'typeorm';

export class AsbtractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}

import {
  DataSource,
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Item } from './entities/item.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Item;
  }

  beforeInsert(event: InsertEvent<Item>): Promise<any> | void {
    this.logger.log('Before insert', JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Item>): Promise<any> | void {
    this.logger.log('After insert', JSON.stringify(event.entity));
  }
}

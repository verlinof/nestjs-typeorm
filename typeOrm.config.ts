import { ConfigService } from '@nestjs/config';
import { Comment } from 'src/items/entities/comment.entity';
import { Item } from 'src/items/entities/item.entity';
import { Listing } from 'src/items/entities/listing.entity';
import { Tag } from 'src/items/entities/tag-entity';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('MYSQL_HOST'),
  port: configService.getOrThrow('MYSQL_PORT'),
  database: configService.getOrThrow('MYSQL_DATABASE'),
  username: configService.getOrThrow('MYSQL_USERNAME'),
  password: configService.getOrThrow('MYSQL_PASSWORD'),
  synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
  migrations: [`migrations/**`],
  entities: [Item, Listing, Comment, Tag],
});

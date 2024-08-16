import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag-entity';

@Injectable()
export class ItemsService {
  // Expose Number from typeOrm to this service
  constructor(
    //Item repository untuk baca database menggunakan typeorm
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    //Automatically generate Listing with id from item to foreign key
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });
    const tags = createItemDto.tags.map((tag) => {
      return new Tag(tag);
    });
    const item = new Item({
      ...createItemDto,
      comments: [],
      listing,
      tags,
    });
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    return this.itemsRepository.findOneOrFail({
      where: { id },
      // Untuk menampilkan hasil relasi
      relations: { listing: true, comments: true, tags: true },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneOrFail({ where: { id } });
    item.public = updateItemDto.public;
    const comments = updateItemDto.comments.map((comment) => {
      return new Comment(comment);
    });
    item.comments = comments;
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    await this.entityManager.delete(Item, id);
  }
}

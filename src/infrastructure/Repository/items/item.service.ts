import { InjectRepository } from '@nestjs/typeorm';
import {
  Item,
  ItemCreatedAt,
  ItemId,
  ItemName,
  ItemRepository,
  ItemTitle,
  ItemUrl,
} from 'src/domain/item';
import { ItemEntity } from 'src/infrastructure/Entity/itemEntity';
import { Repository } from 'typeorm';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';

export class ItemService implements ItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  private mapToDomain(item: ItemEntity) {
    
    return new Item(
      new ItemName(item.name),
      new ItemTitle(item.title),
      new ItemUrl(item.url),
      new ItemId(item.idTask),
      new ItemCreatedAt(item.createdAt),
      new ItemId(item.id),
    );
  }
  
  async create(item: Item): Promise<ItemEntity> {
    await this.taskRepository.update(item.idTask.value,{active:false})
    return await this.repository.save({
      name: item.name.value,
      title: item.title.value,
      url: item.url.value,
      idTask: item.idTask.value,
      createdAt: item.createdAt.value,
    });
  }
  async getAll(): Promise<Item[]> {
    const item = await this.repository.find({ relations: ['task'] });
    return item.map((itemEntity) => this.mapToDomain(itemEntity));
  }
  async getById(id: ItemId): Promise<Item> {
    const item = await this.repository.findOne({ where: { id: id.value } });
    if (!item) return null;
    return this.mapToDomain(item);
  }

  async edit(item: Item): Promise<ItemEntity> {
    await this.repository.update(item.id.value, {
      name: item.name.value,
      title: item.title.value,
      url: item.url.value,
    });
    return await this.repository.findOne({
      where: { id: item.id.value },
    });
  }
  async delete(id: ItemId): Promise<ItemEntity> {
    await this.repository.delete(id.value);
    return await this.repository.findOne({ where: { id: id.value } });
  }
}

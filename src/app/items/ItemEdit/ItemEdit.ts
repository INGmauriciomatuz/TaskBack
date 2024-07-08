import {
  Item,
  ItemCreatedAt,
  ItemId,
  ItemName,
  ItemRepository,
  ItemTaskId,
  ItemTitle,
  ItemUrl,
} from 'src/domain/item';
import { ItemEntity } from 'src/infrastructure/Entity/itemEntity';

export class ItemEdit {
  constructor(private repository: ItemRepository) {}

  async run(
    id: number,
    name: string,
    title: string,
    url: string,
    idTask: number,
    createAt: Date,
  ): Promise<ItemEntity> {
    const item = new Item(
      new ItemName(name),
      new ItemTitle(title),
      new ItemUrl(url),
      new ItemTaskId(idTask),
      new ItemCreatedAt(createAt),
      new ItemId(id),
    );
    return await this.repository.edit(item);
  }
}

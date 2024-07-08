import { Item, ItemId, ItemRepository } from 'src/domain/item';
import { ItemNotFoundError } from './ItemNotFoundError';

export class ItemGetOneById {
  constructor(private repository: ItemRepository) {}
  async run(id: number): Promise<Item> {
    const item = await this.repository.getById(new ItemId(id));
    if (!item) throw new ItemNotFoundError('Item not found');
    return item;
  }
}

import { ItemEntity } from 'src/infrastructure/Entity/itemEntity';
import { Item } from './Item';
import { ItemId } from './ItemId';

export interface ItemRepository {
  create(item: Item): Promise<ItemEntity>;
  getAll(): Promise<Item[]>;
  getById(id: ItemId): Promise<Item | null>;
  edit(item: Item): Promise<ItemEntity>;
  delete(id: ItemId): Promise<ItemEntity>;
}

import {
  Item,
  ItemCreatedAt,
  ItemName,
  ItemRepository,
  ItemTaskId,
  ItemTitle,
  ItemUrl,
} from 'src/domain/item';

export class ItemCreate {
  constructor(private repository: ItemRepository) {}
  async run(
    name: string,
    title: string,
    url: string,
    idTask: number,
    createAt: Date,
  ) {
    const item = new Item(
      new ItemName(name),
      new ItemTitle(title),
      new ItemUrl(url),
      new ItemTaskId(idTask),
      new ItemCreatedAt(createAt),
    );
    return await this.repository.create(item);
  }
}

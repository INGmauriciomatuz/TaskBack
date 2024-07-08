import { ItemCreatedAt } from './ItemCreatedAt';
import { ItemId } from './ItemId';
import { ItemName } from './ItemName';
import { ItemTaskId } from './ItemTaskId';
import { ItemTitle } from './ItemTitle';
import { ItemUrl } from './ItemUrl';

export class Item {
  id: ItemId | null;
  name: ItemName;
  title: ItemTitle;
  url: ItemUrl;
  idTask: ItemTaskId;
  createdAt: ItemCreatedAt;
  constructor(
    name: ItemName,
    title: ItemTitle,
    url: ItemUrl,
    idTask: ItemTaskId,
    createdAt: ItemCreatedAt,
    id?: ItemId,
  ) {
    this.name = name;
    this.title = title;
    this.url = url;
    this.idTask = idTask;
    this.createdAt = createdAt;
    this.id = id;
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      name: this.name.value,
      title: this.title.value,
      url: this.url.value,
      idTask: this.idTask.value,
      createdAt: this.createdAt.value,
    };
  }
}

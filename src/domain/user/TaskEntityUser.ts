import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';
import { TaskUserEntity } from 'src/infrastructure/Entity/taskUserEntity';

export class TaskEntityUser {
  value: TaskUserEntity[];

  constructor(value: TaskUserEntity[]) {
    this.value = value;
  }
}

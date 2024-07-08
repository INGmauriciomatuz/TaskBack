import { TaskId, TaskRepository } from 'src/domain';
import { TaskNotFoundError } from '../TaskGetOneById/TaskNotFoundError';

export class MyFinish {
  constructor(private repository: TaskRepository) {}
  async run(id: number) {
    const task = await this.repository.getFinishTask(new TaskId(id));
    if (!task) throw new TaskNotFoundError('Task not found');
    return task;
  }
}

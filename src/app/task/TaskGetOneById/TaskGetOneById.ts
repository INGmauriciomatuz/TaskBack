import { Task, TaskId, TaskRepository } from 'src/domain/task';
import { TaskNotFoundError } from './TaskNotFoundError';

export class TaskGetOneById {
  constructor(private repository: TaskRepository) {}
  async run(id: number): Promise<Task> {
    const task = await this.repository.getOneById(new TaskId(id));
    if (!task) throw new TaskNotFoundError('Task not found');

    return task;
  }
}

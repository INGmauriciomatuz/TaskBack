import { TaskId, TaskRepository } from 'src/domain/task';

export class TaskDelete {
  constructor(private repository: TaskRepository) {}

  async run(id: number): Promise<void> {
    await this.repository.delete(new TaskId(id));
  }
}

import { Task, TaskRepository } from 'src/domain/task';

export class TaskGetAll {
  constructor(private repository: TaskRepository) {}
  async run(): Promise<Task[]> {
    return await this.repository.getAll();
  }
}

import { Task, TaskId, TaskRepository } from "src/domain";
import { TaskNotFoundError } from "../TaskGetOneById/TaskNotFoundError";

export class MyTask {
  constructor(private repository: TaskRepository) {}
  async run(id: number): Promise<Task[]> {
    const task = await this.repository.getMyTask(new TaskId(id));
    if (!task) throw new TaskNotFoundError('Task not found');
    return task;
  }

}
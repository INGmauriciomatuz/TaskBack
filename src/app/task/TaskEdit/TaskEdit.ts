import {
  Task,
  TaskDescription,
  TaskRepository,
  TaskTitle,
  TaskCreatedAt,
  TaskId,
  TaskUserId,
  TaskUser,
  TaskDeadLine,
} from 'src/domain/task';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

export class TaskEdit {
  constructor(private repository: TaskRepository) {}
  async run(
    id: number,
    title: string,
    description: string,
    createdAt: Date,
    userId: number,
    deadline: Date,
    user?: UserEntity,
  ): Promise<TaskEntity> {
    const rolEdit = new Task(
      new TaskTitle(title),
      new TaskDescription(description),
      new TaskCreatedAt(createdAt),
      new TaskUserId(userId),
      new TaskDeadLine(deadline),
      new TaskUser(user),
      new TaskId(id),
    );
    return await this.repository.edit(rolEdit);
  }
}

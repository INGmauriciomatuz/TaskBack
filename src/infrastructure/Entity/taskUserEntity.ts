import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './userEntity';
import { TaskEntity } from './taskEntity';

@Entity('task_user')
export class TaskUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  taskId: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  // @ManyToOne(() => TaskEntity)
  // task: TaskEntity;
}

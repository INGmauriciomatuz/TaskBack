import { Module } from '@nestjs/common';
import { TaskService } from 'src/infrastructure/repository/task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';
import { TaskController } from './task.controller';
import {
  TaskCreate,
  TaskDelete,
  TaskEdit,
  TaskGetAll,
  TaskGetOneById,
} from 'src/app/task';
import { MyTask } from 'src/app/task/MyTask/MyTask';
import { MyFinish } from 'src/app/task/MyFinish/MyFinish';
import { ItemEntity } from 'src/infrastructure/Entity/itemEntity';
import { SendGridServiceService } from 'src/infrastructure/send-grid-service/send-grid-service.service';
import { UserService } from 'src/infrastructure/Repository/user/user.service';
import { UserGetOneById } from 'src/app/user';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';
import { RolEntity } from 'src/infrastructure/Entity/rolEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, ItemEntity, UserEntity, RolEntity]),
  ],
  controllers: [TaskController],
  providers: [
    { provide: 'TaskRepository', useClass: TaskService },
    { provide: 'UserRepository', useClass: UserService },
    {
      provide: 'TaskGetAll',
      useFactory: (repository: TaskService) => new TaskGetAll(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskGetOneById',
      useFactory: (repository: TaskService) => new TaskGetOneById(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskCreate',
      useFactory: (repository: TaskService) => new TaskCreate(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskEdit',
      useFactory: (repository: TaskService) => new TaskEdit(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskDelete',
      useFactory: (repository: TaskService) => new TaskDelete(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'MyTask',
      useFactory: (repository: TaskService) => new MyTask(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'MyTaskFinish',
      useFactory: (repository: TaskService) => new MyFinish(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'UserGetOneById',
      useFactory: (repository: UserService) => new UserGetOneById(repository),
      inject: ['UserRepository'],
    },
    TaskService,
    SendGridServiceService,
    UserService,
  ],
})
export class TaskModule {}

import { Module } from '@nestjs/common';
import { TaskUserController } from './task-user.controller';

@Module({
  controllers: [TaskUserController]
})
export class TaskUserModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { TaskUserController } from './task-user.controller';

describe('TaskUserController', () => {
  let controller: TaskUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskUserController],
    }).compile();

    controller = module.get<TaskUserController>(TaskUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

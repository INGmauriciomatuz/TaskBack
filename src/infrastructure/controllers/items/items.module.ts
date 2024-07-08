import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from 'src/infrastructure/Entity/itemEntity';
import { ItemService } from 'src/infrastructure/Repository/items/item.service';
import {
  ItemCreate,
  ItemDelete,
  ItemEdit,
  ItemGetAll,
  ItemGetOneById,
} from 'src/app/items';
import { ConfigModule } from '@nestjs/config';
import { TaskService } from 'src/infrastructure/repository/task/task.service';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity,TaskEntity]), ],
  controllers: [ItemsController],
  providers: [
    { provide: 'ItemRepository', useClass: ItemService },
    {
      provide: 'ItemGetAll',
      useFactory: (repository: ItemService) => new ItemGetAll(repository),
      inject: ['ItemRepository'],
    },
    {
      provide: 'ItemOneById',
      useFactory: (repository: ItemService) => new ItemGetOneById(repository),
      inject: ['ItemRepository'],
    },
    {
      provide: 'ItemCreate',
      useFactory: (repository: ItemService) => new ItemCreate(repository),
      inject: ['ItemRepository'],
    },
    {
      provide: 'ItemEdit',
      useFactory: (repository: ItemService) => new ItemEdit(repository),
      inject: ['ItemRepository'],
    },
    {
      provide: 'ItemDelete',
      useFactory: (repository: ItemService) => new ItemDelete(repository),
      inject: ['ItemRepository'],
    },
    ItemService,
  ],
})
export class ItemsModule {}

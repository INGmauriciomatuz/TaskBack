import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from 'src/infrastructure/Entity/rolEntity';
import { RolService } from 'src/infrastructure/repository/rol/rol.service';
import {
  RolCreate,
  RolDelete,
  RolEdit,
  RolGetAll,
  RolGetOneById,
} from 'src/app/rol';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity])],
  controllers: [RolController],
  providers: [
    { provide: 'RolRepository', useClass: RolService },
    {
      provide: 'RolGetAll',
      useFactory: (repository: RolService) => new RolGetAll(repository),
      inject: ['RolRepository'],
    },
    {
      provide: 'RolGetOneById',
      useFactory: (repository: RolService) => new RolGetOneById(repository),
      inject: ['RolRepository'],
    },
    {
      provide: 'RolCreate',
      useFactory: (repository: RolService) => new RolCreate(repository),
      inject: ['RolRepository'],
    },
    {
      provide: 'RolEdit',
      useFactory: (repository: RolService) => new RolEdit(repository),
      inject: ['RolRepository'],
    },
    {
      provide: 'RolDelete',
      useFactory: (repository: RolService) => new RolDelete(repository),
      inject: ['RolRepository'],
    },
    RolService,
  ],
})
export class RolModule {}

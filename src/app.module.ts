import { Module } from '@nestjs/common';
import { UsersModule } from './infrastructure/controllers/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './infrastructure/Entity/userEntity';
import { RolEntity } from './infrastructure/Entity/rolEntity';
import { RolModule } from './infrastructure/controllers/rol/rol.module';
import { TaskModule } from './infrastructure/controllers/task/task.module';
import { SendGridEmailModuleModule } from './infrastructure/controllers/send-grid-email-module/send-grid-email-module.module';
import { TaskEntity } from './infrastructure/Entity/taskEntity';
import { TaskUserModule } from './infrastructure/controllers/task-user/task-user.module';
import { ItemsModule } from './infrastructure/controllers/items/items.module';
import { ItemEntity } from './infrastructure/Entity/itemEntity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SendGridServiceService } from './infrastructure/send-grid-service/send-grid-service.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity, RolEntity, TaskEntity, ItemEntity],
      synchronize: true,
      dropSchema: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    UsersModule,
    RolModule,
    TaskModule,
    SendGridEmailModuleModule,
    TaskUserModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [SendGridServiceService],
})
export class AppModule {}

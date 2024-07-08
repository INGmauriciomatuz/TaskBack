import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';
import {
  UserCreate,
  UserDelete,
  UserEdit,
  UserGetAll,
  UserGetOneById,
  UserLogin,
} from 'src/app/user';
import { UserService } from 'src/infrastructure/Repository/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RolEntity } from 'src/infrastructure/Entity/rolEntity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([UserEntity, RolEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    { provide: 'UserRepository', useClass: UserService },
    {
      provide: 'UserGetAll',
      useFactory: (repository: UserService) => new UserGetAll(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserGetOneById',
      useFactory: (repository: UserService) => new UserGetOneById(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserCreate',
      useFactory: (repository: UserService) => new UserCreate(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserEdit',
      useFactory: (repository: UserService) => new UserEdit(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserDelete',
      useFactory: (repository: UserService) => new UserDelete(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserLogin',
      useFactory: (repository: UserService) => new UserLogin(repository),
      inject: ['UserRepository'],
    },
    UserService,
  ],
})
export class UsersModule {}

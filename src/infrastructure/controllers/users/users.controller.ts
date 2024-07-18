import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  UserCreate,
  UserDelete,
  UserEdit,
  UserGetAll,
  UserGetOneById,
  UserLogin,
} from 'src/app/user';
import { Create, Edit, FindOneParams, Login } from './dto/validation';
import { UserResponseDto } from './dto/response';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';
import { UserNotFoundError } from 'src/domain';
import { AuthGuard } from '../../../common/guard/auth/auth.guard';
import { Role } from '../../../common/enums/role.enum';
import { RolesGuard } from 'src/common/guard/rol/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@Controller('user')
export class UsersController {
  constructor(
    @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
    @Inject('UserGetOneById') private readonly userGetOne: UserGetOneById,
    @Inject('UserCreate') private readonly userCreate: UserCreate,
    @Inject('UserEdit') private readonly userEdit: UserEdit,
    @Inject('UserDelete') private readonly userDelete: UserDelete,
    @Inject('UserLogin') private readonly userLogin: UserLogin,
  ) {}

  private mapToDto(userEntity: UserEntity): UserResponseDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      rolId: userEntity.rolId,
      // taskId: userEntity.taskId,
      createdAt: userEntity.createdAt.toISOString(), // o como prefieras formatear la fecha
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async users() {
    try {
      return (await this.userGetAll.run()).map((user) => user.toPlainObject());
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error faltas ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  async user(@Param() params: FindOneParams) {
    try {
      return (await this.userGetOne.run(params.id)).toPlainObject();
    } catch (error) {
      if (error instanceof UserNotFoundError) return new NotFoundException();
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error faltas ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() body: Create) {
    try {
      const create = await this.userCreate.run(
        body.name,
        body.email,
        new Date(),
        body.rolId,
        body.password,
      );
      const dto = this.mapToDto(create);
      return dto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          status: HttpStatus.BAD_REQUEST,
          error: `Faltan datos ${error}`,
        });
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error faltas ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async edit(@Param() param: FindOneParams, @Body() body: Edit) {
    try {
      const user = await this.userEdit.run(
        param.id,
        body.name,
        body.email,
        new Date(),
        body.rolId,
        body.password,
      );
      const dto = this.mapToDto(user);
      return dto;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error faltas ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param() params: FindOneParams) {
    try {
      return await this.userDelete.run(params.id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error faltas ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('login')
  async login(@Body() body: Login) {
    try {
      return await this.userLogin.run(body.email, body.password);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Credenciales erroneas',
        });
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

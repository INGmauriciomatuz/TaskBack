import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  RolCreate,
  RolDelete,
  RolEdit,
  RolGetAll,
  RolGetOneById,
} from 'src/app/rol';
import { RolEntity } from 'src/infrastructure/Entity/rolEntity';
import { RolResponseDto } from './dto/response';
import { Create, FindOneParams, Edit } from './dto/validation';
import { RolNotFoundError } from 'src/app/rol/RolGetOneById/RolNotFoundError';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Rol")
@Controller('rol')
export class RolController {
  constructor(
    @Inject('RolGetAll') private readonly rolGetAll: RolGetAll,
    @Inject('RolGetOneById') private readonly rolGetOne: RolGetOneById,
    @Inject('RolCreate') private readonly rolCreate: RolCreate,
    @Inject('RolEdit') private readonly rolEdit: RolEdit,
    @Inject('RolDelete') private readonly RolDelete: RolDelete,
  ) {}

  private mapToDto(rolEntity: RolEntity): RolResponseDto {
    return {
      id: rolEntity.id,
      rol: rolEntity.rol,
      createdAt: rolEntity.createdAt.toISOString(),
    };
  }

  @Get()
  async roles() {
    try {
      return (await this.rolGetAll.run()).map((rol) => rol.toPlainObject());
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
  @Get(':id')
  async rol(@Param() params: FindOneParams) {
    try {
      return (await this.rolGetOne.run(params.id)).toPlainObject();
    } catch (error) {
      if (error instanceof RolNotFoundError) return new NotFoundException();
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error faltas ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  async create(@Body() body: Create) {
    try {
      const create = await this.rolCreate.run(body.rol, new Date());
      return this.mapToDto(create);
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
  @Put(':id')
  async edit(@Param() params: FindOneParams, @Body() body: Edit) {
    try {
      const create = await this.rolEdit.run(params.id, body.rol, new Date());
      return this.mapToDto(create);
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

  @Delete(':id')
  async delete(@Param() params: FindOneParams) {
    try {
      await this.RolDelete.run(params.id);
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
}

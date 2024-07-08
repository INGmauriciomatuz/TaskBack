import {
  Controller,
  Get,
  Post,
  Inject,
  NotFoundException,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  TaskCreate,
  TaskDelete,
  TaskEdit,
  TaskGetAll,
  TaskGetOneById,
} from 'src/app/task';
import {} from '@sendgrid/mail';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';
import { TaskResponseDto } from './dto/response';
import { FindOneParams } from '../users/dto/validation';
import { TaskNotFoundError } from 'src/app/task/TaskGetOneById/TaskNotFoundError';
import { Create, Edit } from './dto/validation';
import { Role } from '../../../common/enums/role.enum';
import { AuthGuard } from '../../../common/guard/auth/auth.guard';
import { request } from 'http';
import { RolesGuard } from 'src/common/guard/rol/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { DecoderToken } from 'src/common/decorators/tokendecoder.decorator';
import { MyTask } from 'src/app/task/MyTask/MyTask';
import { MyFinish } from 'src/app/task/MyFinish/MyFinish';
import { SendGridServiceService } from 'src/infrastructure/send-grid-service/send-grid-service.service';
import { UserGetOneById } from 'src/app/user';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('TaskGetAll') private readonly taskGetAll: TaskGetAll,
    @Inject('TaskGetOneById') private readonly taskGetOne: TaskGetOneById,
    @Inject('TaskEdit') private readonly taskEdit: TaskEdit,
    @Inject('TaskDelete') private readonly taskDelete: TaskDelete,
    @Inject('TaskCreate') private readonly taskCreate: TaskCreate,
    @Inject('MyTask') private readonly taskMy: MyTask,
    @Inject('MyTaskFinish') private readonly taskMyFinish: MyFinish,
    @Inject('UserGetOneById') private readonly userGetOne: UserGetOneById,

    private readonly emailService: SendGridServiceService,
  ) {}
  private mapToDto(taskEntity: TaskEntity): TaskResponseDto {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      userId: taskEntity.userId,
      user: taskEntity.user,
      createdAt: taskEntity.createdAt.toISOString(),
    };
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async tasks() {
    try {
      return (await this.taskGetAll.run()).map((task) => task.toPlainObject());
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
  @Roles(Role.Admin, Role.User)
  @Get(':id')
  async task(@Param() params: FindOneParams) {
    try {
      return (await this.taskGetOne.run(params.id)).toPlainObject();
    } catch (error) {
      if (error instanceof TaskNotFoundError) return new NotFoundException();
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
  @Roles(Role.User)
  @Get('my/task')
  async myTask(@DecoderToken() params) {
    try {
      const userId = params.sub;
      return (await this.taskMy.run(userId)).map((task) =>
        task.toPlainObject(),
      );
    } catch (error) {
      if (error instanceof TaskNotFoundError) return new NotFoundException();
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
  @Roles(Role.User)
  @Get('/my/finish')
  async myFinish(@DecoderToken() params) {
    try {
      const userId = params.sub;
      return (await this.taskMyFinish.run(userId)).map((task) =>
        task.toPlainObject(),
      );
    } catch (error) {
      if (error instanceof TaskNotFoundError) return new NotFoundException();
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
      const create = await this.taskCreate.run(
        body.title,
        body.description,
        new Date(),
        body.userId,
        body.deadline,
      );
      const email = await this.userGetOne.run(create.userId);
      await this.emailService.sendEmail(
        email.email.value,
        'Tarea asignada a ti',
        `La tarea tiene como titulo ${body.title}`,
        `
        <p>Estimado/a ${email.name.value},</p>
        <p>Nos complace informarle que se ha creado una nueva tarea en nuestro sistema de gestión de tareas. A continuación, encontrará los detalles de la nueva tarea:</p>
        <ul>
          <li><strong>Título:</strong> ${body.title}</li>
          <li><strong>Descripción:</strong> ${body.description}</li>
          <li><strong>Fecha de Creación:</strong> ${create.createdAt.toISOString()}</li>
          <li><strong>Fecha Límite:</strong> ${body.deadline}</li>
        </ul>
        <p>Le recomendamos revisar esta tarea a la brevedad y tomar las acciones necesarias. Si tiene alguna duda o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.</p>
        <p>Atentamente,</p>
        `,
      );
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async edit(@Param() params: FindOneParams, @Body() body: Edit) {
    try {
      if (!params.id) {
        throw new NotFoundException('ID is required');
      }
      const put = await this.taskEdit.run(
        params.id,
        body.title,
        body.description,
        new Date(),
        body.userId,
        body.deadline,
        body.user,
      );
      if (!put) {
        throw new NotFoundException('Task not found');
      }
      return this.mapToDto(put);
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async delete(@Param() params: FindOneParams) {
    try {
      await this.taskDelete.run(params.id);
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

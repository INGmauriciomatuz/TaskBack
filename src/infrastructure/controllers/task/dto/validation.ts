import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

export class Create {
  @ApiProperty({ example: 'Tarea 1',description:"Titulo de la tarea" })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({ example: 'Descripcion de la tarea 1' ,description:"Descripcion de la tarea"})
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({ example: 2,description:"El id del usuario a asignar" })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @ApiProperty({ example: '2024-07-09 00:00:00',description:"Fecha que debe de entregar dicha tarea " })
  @IsNotEmpty()
  @IsDateString()
  deadline: Date;
}

export class Edit {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsDateString()
  deadline: Date;
  user: UserEntity;
}
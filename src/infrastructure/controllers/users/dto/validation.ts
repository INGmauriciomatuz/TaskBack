import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @ApiProperty({})
  @IsNumberString()
  id: number;
}

export class Create {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 1 })
  @IsNumber()
  rolId: number;
  @ApiProperty({ example: 'Aa1@5678' })
  @IsString()
  password: string;
}

export class Login {
  @ApiProperty({
    example: 'test1@gmail.com',
    description: 'Correo del usuario',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '1testEo$',
    description: 'Contraseña del usuario',
  })
  @IsString()
  password: string;
}

export class Edit {
  @ApiProperty({example:'John Deov'})
  @IsString()
  name: string;
  @ApiProperty({example:'john.doe@example.com'})
  @IsEmail()
  email: string;
  @ApiProperty({example:1})
  @IsNumber()
  rolId: number;
  @ApiProperty({example:'Aa1@5678'})
  @IsString()
  password: string;
}

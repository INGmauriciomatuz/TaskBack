import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  @ApiProperty({})
  id: number;
}

export class Create {
  @ApiProperty({ example: 'admin',description:"Rol principal" })
  @IsString()
  rol: string;
}

export class Edit {
  @IsString()
  rol: string;
}

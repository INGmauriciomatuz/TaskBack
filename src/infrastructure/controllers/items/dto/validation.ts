import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export class Create {
  @IsNumberString()
  idTask: number;
}
export class Edit {
  @IsString()
  name: string;
  @IsString()
  title: string;
  @IsString()
  url: string;
  @IsNumber()
  idTask: number;
}

import { IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export class Create {
  @IsString()
  rol: string;
}

export class Edit {
  @IsString()
  rol: string;
}

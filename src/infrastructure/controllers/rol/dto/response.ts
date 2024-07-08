import { IsNumber, IsString } from 'class-validator';

export class RolResponseDto {
  @IsNumber()
  id: number;
  @IsString()
  rol: string;
  @IsString()
  createdAt: string;
}

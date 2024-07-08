import { IsString, IsNumber } from 'class-validator';

export class ItemResponseDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  title: string;
  @IsString()
  url: string;
  @IsString()
  idTask: number;
  @IsString()
  createAt: string;
}

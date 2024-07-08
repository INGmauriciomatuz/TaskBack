import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
  @IsNumber()
  rolId;
  // @IsNumber()
  // taskId;

  @IsString()
  createdAt: string; // o Date si prefieres
}

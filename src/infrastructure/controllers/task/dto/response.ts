import { IsNumber, IsString } from "class-validator";
import { UserEntity } from "src/infrastructure/Entity/userEntity";

export class TaskResponseDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  createdAt: string;
  @IsNumber()
  userId: number;
  user:UserEntity
}

import { UserEntity } from "src/infrastructure/Entity/userEntity";

export class TaskUser {
  value: UserEntity;
  constructor(value: UserEntity) {
    this.value = value;
  }
}

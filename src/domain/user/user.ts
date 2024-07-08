
import { RolEntityUser } from './RolEntity';
import { RolIdU } from './RolIdU';
import { Password } from './Password';
import { UserCreatedAt } from './UserCreatedAt';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  id: UserId | null;
  name: UserName;
  email: UserEmail;
  rolId: RolIdU;
  createAt: UserCreatedAt;
  password: Password;
  rol: RolEntityUser | null;

  constructor(
    name: UserName,
    email: UserEmail,
    createAt: UserCreatedAt,
    rolId: RolIdU,
    password:  Password,
    rol?: RolEntityUser,
    id?: UserId,
  ) {
    this.id = id || null;
    this.name = name;
    this.email = email;
    this.createAt = createAt;
    this.rolId = rolId;
    this.password =  password;
    this.rol = rol || null;
  }
  public toPlainObject() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      createdAt: this.createAt.value,
      rol: this.rol.value,
    };
  }
}

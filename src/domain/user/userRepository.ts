import { UserEntity } from 'src/infrastructure/Entity/userEntity';
import { UserId } from './UserId';
import { User } from './user';
import { UserEmail } from './UserEmail';
import { Password } from './Password';

export interface UserRepository {
  create(user: User): Promise<UserEntity>;
  getAll(): Promise<User[]>;
  getOneById(id: UserId): Promise<User | null>;
  edit(user: User): Promise<UserEntity>;
  delete(user: UserId): Promise<void>;
  login(email:UserEmail, password: Password): Promise<User | object>;
}

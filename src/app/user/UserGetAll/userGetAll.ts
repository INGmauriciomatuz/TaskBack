import { User } from 'src/domain/user/user';
import { UserRepository } from 'src/domain/user/userRepository';

export class UserGetAll {
  constructor(private repository: UserRepository) {}

  async run(): Promise<User[]> {
    return this.repository.getAll();
  }
}

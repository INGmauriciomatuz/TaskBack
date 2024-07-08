import { UserId } from 'src/domain/user/UserId';
import { UserNotFoundError } from 'src/domain/user/UserNotFoundError';
import { User } from 'src/domain/user/user';
import { UserRepository } from 'src/domain/user/userRepository';

export class UserGetOneById {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<User> {
    const user = await this.repository.getOneById(new UserId(id));

    if (!user) throw new UserNotFoundError('User not found'); // retorna 404
    
    return user;
  }
}

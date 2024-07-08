import { User, UserEmail, UserNotFoundError, UserRepository } from 'src/domain';
import { Password } from 'src/domain/user/Password';

export class UserLogin {
  constructor(private repository: UserRepository) {}

  async run(email: string, password: string): Promise<User | object> {
    const user = await this.repository.login(
      new UserEmail(email),
      new Password(password),
    );
    if (!user) throw new UserNotFoundError('User not found');
    return user;
  }
}

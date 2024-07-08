import { UserId } from 'src/domain/user/UserId';
import { UserRepository } from 'src/domain/user/userRepository';

export class UserDelete {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<void> {
    await this.repository.delete(new UserId(id));
  }
}

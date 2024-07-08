import { RolId, RolRepository } from 'src/domain/rol';

export class RolDelete {
  constructor(private repository: RolRepository) {}

  async run(id: number): Promise<void> {
    await this.repository.delete(new RolId(id));
  }
}

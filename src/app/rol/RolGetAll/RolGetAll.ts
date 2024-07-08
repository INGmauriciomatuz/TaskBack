import { Rol, RolRepository } from 'src/domain/rol';

export class RolGetAll {
  constructor(private repository: RolRepository) {}
  async run(): Promise<Rol[]> {
    return await this.repository.getAll();
  }
}

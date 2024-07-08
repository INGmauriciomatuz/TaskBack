import { Rol, RolId, RolRepository } from 'src/domain/rol';
import { RolNotFoundError } from './RolNotFoundError';

export class RolGetOneById {
  constructor(private repository: RolRepository) {}
  async run(id: number): Promise<Rol> {
    const rol = await this.repository.getOneById(new RolId(id));
    if (!rol) throw new RolNotFoundError('Rol not found');

    return rol;
  }
}

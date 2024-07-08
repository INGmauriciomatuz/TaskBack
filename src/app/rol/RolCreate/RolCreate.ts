import {
  Rol,
  RolCreatedAt,
  RolId,
  RolRepository,
  RolRol,
} from 'src/domain/rol';
import { RolEntity } from 'src/infrastructure/Entity/rolEntity';

export class RolCreate {
  constructor(private repository: RolRepository) {}

  async run(rol: string, createdAt: Date, id?: number): Promise<RolEntity> {
    const newrol = new Rol(
      new RolRol(rol),
      new RolCreatedAt(createdAt),
      new RolId(id),
    );
    return await this.repository.create(newrol);
  }
}

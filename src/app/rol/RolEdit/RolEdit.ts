import {
  Rol,
  RolCreatedAt,
  RolId,
  RolRepository,
  RolRol,
} from 'src/domain/rol';
import { RolEntity } from 'src/infrastructure/Entity/rolEntity';

export class RolEdit {
  constructor(private repository: RolRepository) {}
  async run(id: number, rol: string, createdAt: Date): Promise<RolEntity> {
    const rolEdit = new Rol(
      new RolRol(rol),
      new RolCreatedAt(createdAt),
      new RolId(id),
    );
    return await this.repository.edit(rolEdit);
  }
}

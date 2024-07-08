import { RolEntity } from 'src/infrastructure/Entity/rolEntity';
import { Rol } from './Rol';
import { RolId } from './RolId';

export interface RolRepository {
  create(rol: Rol): Promise<RolEntity>;
  getAll(): Promise<Rol[]>;
  getOneById(id: RolId): Promise<Rol | null>;
  edit(rol: Rol): Promise<RolEntity>;
  delete(id: RolId): Promise<RolEntity>;
}

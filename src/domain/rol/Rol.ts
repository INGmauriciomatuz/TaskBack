import { RolId } from './RolId';
import { RolRol } from './RolRol';
import { RolCreatedAt } from './RolCreatedAt';

export class Rol {
  rol: RolRol;
  id: RolId | null;
  createAt: RolCreatedAt;
  constructor(rol: RolRol, createAt: RolCreatedAt, id?: RolId) {
    this.rol = rol;
    this.createAt = createAt;
    this.id = id || null;
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      rol: this.rol.value,
    };
  }
}

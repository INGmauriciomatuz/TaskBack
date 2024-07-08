import { InjectRepository } from '@nestjs/typeorm';
import {
  Rol,
  RolCreatedAt,
  RolId,
  RolRepository,
  RolRol,
} from 'src/domain/rol';
import { RolEntity } from 'src/infrastructure/Entity/rolEntity';
import { Repository } from 'typeorm';

export class RolService implements RolRepository {
  constructor(
    @InjectRepository(RolEntity)
    private readonly respository: Repository<RolEntity>,
  ) {}

  private mapToDomain(rol: RolEntity) {
    return new Rol(
      new RolRol(rol.rol),
      new RolCreatedAt(rol.createdAt),
      new RolId(rol.id),
    );
  }
  async create(rol: Rol): Promise<RolEntity> {
    return await this.respository.save({
      rol: rol.rol.value,
      createdAt: rol.createAt.value,
    });
  }
  async getAll(): Promise<Rol[]> {
    const rolEntities = await this.respository.find();
    return rolEntities.map((rolEntity) => this.mapToDomain(rolEntity));
  }

  async getOneById(id: RolId): Promise<Rol> {
    const rol = await this.respository.findOne({ where: { id: id.value } });
    if (!rol) return null;
    return this.mapToDomain(rol);
  }
  async edit(rol: Rol): Promise<RolEntity> {
    await this.respository.update(rol.id.value, { rol: rol.rol.value });
    return await this.respository.findOne({ where: { id: rol.id.value } });
  }
  async delete(id: RolId): Promise<RolEntity> {
    await this.respository.delete(id.value);
    return await this.respository.findOne({ where: { id: id.value } });
  }
}

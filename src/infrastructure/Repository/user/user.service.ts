import { InjectRepository } from '@nestjs/typeorm';
import {
  RolIdU,
  User,
  UserCreatedAt,
  UserEmail,
  UserId,
  UserName,
  UserRepository,
} from 'src/domain';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';
import { RolEntityUser } from 'src/domain/user/RolEntity';
import { Password } from 'src/domain/user/Password';
import { JwtService } from '@nestjs/jwt';
import { RolEntity } from 'src/infrastructure/Entity/rolEntity';
import { NotFoundException } from '@nestjs/common';

export class UserService implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    @InjectRepository(RolEntity)
    private readonly rolRepository: Repository<RolEntity>,
    private jwtService: JwtService,
  ) {}

  private mapToDomain(u: UserEntity) {
    return new User(
      new UserName(u.name),
      new UserEmail(u.email),
      new UserCreatedAt(u.createdAt),
      new RolIdU(u.rolId),
      new Password(u.password),
      new RolEntityUser(u.rol),
      new UserId(u.id),
    );
  }

  public async getAll(): Promise<User[]> {
    const users = await this.repository.find({
      relations: ['rol'],
    });
    return users.map((u) => this.mapToDomain(u));
  }

  async getOneById(id: UserId): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        id: id.value,
      },
      relations: ['rol'],
    });

    if (!user) return null;

    return this.mapToDomain(user);
  }

  async create(user: User): Promise<UserEntity> {
    const rol = await this.rolRepository.findOne({
      where: {
        id: user.rolId.value,
      },
    });
    if (!rol) throw new NotFoundException('Role not exist');
    const test = await this.repository.save({
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createAt.value,
      rolId: user.rolId.value,
      password: user.password.value,
    });
    return test;
  }

  async edit(user: User): Promise<UserEntity> {
    await this.repository.update(user.id.value, {
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createAt.value,
    });
    return await this.repository.findOneBy({ id: user.id.value });
  }

  async delete(id: UserId): Promise<void> {
    await this.repository.delete(id.value);
  }

  async login(email: UserEmail, password: Password): Promise<User | object> {
    const user = await this.repository.findOne({
      where: { email: email.value, password: password.value },
      relations: ['rol'],
    });
    if (!user) return null;
    const payload = { sub: user.id, name: user.name, rol: user.rol.rol };
    const access_token = { access_token: await this.jwtService.signAsync(payload) }
    // const { access_token } = {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
    return access_token;
  }
}

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity('rol')
export class RolEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rol: string;
  @Column()
  createdAt: Date;
  @OneToMany(() => UserEntity, (user) => user.rol)
  users: UserEntity[];
}

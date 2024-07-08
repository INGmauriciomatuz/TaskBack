import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolEntity } from './rolEntity';
import { TaskUserEntity } from './taskUserEntity';
import { TaskEntity } from './taskEntity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  createdAt: Date;
  @Column()
  rolId: number;

  @ManyToOne(() => RolEntity)
  @JoinColumn({ name: 'rolId' })
  rol: RolEntity;

  @OneToMany(() => TaskEntity, (task) => task.id  )
  tasks: TaskEntity;
}

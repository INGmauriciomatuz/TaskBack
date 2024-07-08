import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './userEntity';
import { ItemEntity } from './itemEntity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  createdAt: Date;
  @Column()
  userId: number;
  @Column({ default: null })
  deadline: Date;
  @Column({ type: 'boolean', default: true })
  active: boolean = true;
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  @OneToMany(() => ItemEntity, (items) => items.task)
  item: ItemEntity[];
}

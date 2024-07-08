import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './taskEntity';

@Entity('item')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  title: string;
  @Column()
  url: string;
  @Column()
  idTask: number;
  @Column()
  createdAt: Date;
  @ManyToOne(() => TaskEntity)
  @JoinColumn({ name: 'idTask' })
  task: TaskEntity[];
}

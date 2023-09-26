import { TaskEntity } from 'src/task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task-status' })
export class TaskStatusEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @OneToMany(() => TaskEntity, (task) => task.status)
  tasks: TaskEntity[];
}

import { TaskEntity } from 'src/task/task.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTaskStatus } from './user-task-status.enum';

@Entity({ name: 'user-task' })
export class UserTaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  @ManyToOne(() => TaskEntity, (task) => task.users)
  task: TaskEntity;

  @Column({ type: 'numeric' })
  timeTracked: number;

  @Column({ type: 'enum', enum: UserTaskStatus, default: UserTaskStatus.PAUSE })
  trackStatus: UserTaskStatus;
}

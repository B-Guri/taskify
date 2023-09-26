import { Exclude } from 'class-transformer';
import { CommentEntity } from 'src/comment/comment.entity';
import { TaskStatusEntity } from 'src/task-status/task-status.entity';
import { TeamEntity } from 'src/team/team.entity';
import { UserTaskEntity } from 'src/user-task/user-task.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', nullable: true })
  startDate: number;

  @Column({ type: 'numeric', nullable: true })
  dueDate: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'numeric', nullable: true })
  estimate: number;

  @ManyToOne(() => TaskStatusEntity, (taskStatus) => taskStatus.tasks)
  status: TaskEntity;

  @ManyToOne(() => TeamEntity, (team) => team.tasks)
  @Exclude()
  team: TeamEntity;

  @OneToMany(() => UserTaskEntity, (user) => user.task)
  users: UserEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.task)
  comments: CommentEntity[];
}

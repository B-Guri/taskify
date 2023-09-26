import { TaskEntity } from 'src/task/task.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne(() => TaskEntity, (task) => task.comments)
  task: TaskEntity;

  @Column()
  content: string;

  @Column()
  attachedFile: string;
}

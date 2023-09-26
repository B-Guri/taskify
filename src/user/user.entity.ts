import { Exclude } from 'class-transformer';
import { CommentEntity } from 'src/comment/comment.entity';
import { UserTaskEntity } from 'src/user-task/user-task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTeamEntity } from './user-team.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => UserTeamEntity, (userTeam) => userTeam.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  teams: UserTeamEntity[];

  @OneToMany(() => UserTaskEntity, (task) => task.user)
  tasks: UserTaskEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}

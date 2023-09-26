import { TaskEntity } from 'src/task/task.entity';
import { UserTeamEntity } from 'src/user/user-team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'team' })
export class TeamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => TaskEntity, (task) => task.team)
  tasks: TaskEntity[];

  @OneToMany(() => UserTeamEntity, (userTeam) => userTeam.team)
  @JoinColumn()
  users: UserTeamEntity[];
}

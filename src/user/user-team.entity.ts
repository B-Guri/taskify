import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TeamEntity } from 'src/team/team.entity';
import { UserTeamRole } from './user-team-role.enum';

@Entity({ name: 'user-team' })
@Unique(['user', 'team'])
export class UserTeamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.teams, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => TeamEntity, (team) => team.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  team: TeamEntity;

  @Column({ type: 'enum', enum: UserTeamRole, default: UserTeamRole.USER })
  role: UserTeamRole;
}

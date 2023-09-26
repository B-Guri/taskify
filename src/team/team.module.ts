import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserTeamEntity } from 'src/user/user-team.entity';
import { UserModule } from 'src/user/user.module';
import { TaskEntity } from 'src/task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity, UserTeamEntity, TaskEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}

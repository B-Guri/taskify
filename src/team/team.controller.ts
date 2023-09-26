import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { TeamEntity } from './team.entity';
import { AuthGuard } from '@nestjs/passport';
import { AddUserByEmailDto } from './dto/add-user-by-email.dto';
import { IsAdminGuard } from 'src/auth/is-admin.guard';
import { IsInTeamGuard } from 'src/auth/is-in-team.guard';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { TaskEntity } from 'src/task/task.entity';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  @UseGuards(AuthGuard())
  createTeam(
    @Body() createTeamDto: CreateTeamDto,
    @GetUser() user: UserEntity,
  ): Promise<TeamEntity> {
    return this.teamService.createTeam(createTeamDto, user);
  }

  @Post('/add')
  @UseGuards(AuthGuard(), IsAdminGuard)
  addUserToTeamByEmail(
    @Body() addUserByEmailDto: AddUserByEmailDto,
  ): Promise<TeamEntity> {
    return this.teamService.addUserToTeamByEmail(
      addUserByEmailDto.userEmail,
      addUserByEmailDto.teamId,
    );
  }

  @Get('/:teamId')
  @UseGuards(AuthGuard(), IsInTeamGuard)
  getTeamById(@Param('teamId') teamId: string): Promise<TeamEntity> {
    return this.teamService.getTeamById(teamId);
  }

  @Post('/:teamId/createtask')
  @UseGuards(AuthGuard(), IsInTeamGuard)
  createTask(
    @Param('teamId') teamId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    return this.teamService.createTask(teamId, createTaskDto);
  }
}

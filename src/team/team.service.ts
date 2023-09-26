import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UserEntity } from 'src/user/user.entity';
import { UserTeamEntity } from 'src/user/user-team.entity';
import { UserTeamRole } from 'src/user/user-team-role.enum';
import { UserService } from 'src/user/user.service';
import { TaskEntity } from 'src/task/task.entity';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,
    @InjectRepository(UserTeamEntity)
    private userTeamRepository: Repository<UserTeamEntity>,
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    private userService: UserService,
  ) {}

  async createTeam(
    createTeamDto: CreateTeamDto,
    user: UserEntity,
  ): Promise<TeamEntity> {
    const { name, description } = createTeamDto;

    const team = this.teamRepository.create({
      name,
      description,
    });

    const responce = await this.teamRepository.save(team);

    const userTeam = this.userTeamRepository.create({
      user: user,
      team: responce,
      role: UserTeamRole.ADMIN,
    });
    await this.userTeamRepository.save(userTeam);

    return responce;
  }

  async addUserToTeamByEmail(
    userEmail: string,
    teamId: string,
  ): Promise<TeamEntity> {
    const user = await this.userService.getUserByEmail(userEmail);
    const team = await this.teamRepository.findOne({ where: { id: teamId } });

    if (!team) {
      throw new NotFoundException('Team not found!');
    }

    const userTeam = this.userTeamRepository.create({
      team: team,
      user: user,
      role: UserTeamRole.USER,
    });
    const responce = await this.userTeamRepository.save(userTeam);

    return responce.team;
  }

  async getTeamById(teamId: string): Promise<TeamEntity> {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: { users: { user: true } },
    });
    if (!team) {
      throw new NotFoundException('Team Not Found!');
    }

    return team;
  }

  async createTask(
    teamId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    const team = await this.getTeamById(teamId);
    const task = this.taskRepository.create({ ...createTaskDto, team });
    try {
      const responce = await this.taskRepository.save(task);
      return responce;
    } catch (e) {
      throw new InternalServerErrorException('Task was not created!');
    }
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserById(@GetUser() user: UserEntity): UserEntity {
    return user;
  }
}

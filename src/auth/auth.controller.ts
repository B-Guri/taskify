import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ResponceUserTokenDto } from './dto/responce-user-token.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/singup')
  singUp(@Body() createUserDto: CreateUserDto): Promise<ResponceUserTokenDto> {
    return this.authService.singUp(createUserDto);
  }

  @Post('/singin')
  singIn(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<ResponceUserTokenDto> {
    return this.authService.singIn(authCredentials);
  }
}

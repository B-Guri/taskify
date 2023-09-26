import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/user.entity';
import { ResponceUserTokenDto } from './dto/responce-user-token.dto';
import { UserService } from 'src/user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async singUp(createUserDto: CreateUserDto): Promise<ResponceUserTokenDto> {
    const userId = await this.userService.createUser(createUserDto);

    const accessToken: string = await this.jwtService.sign({ id: userId });
    const { firstname, lastname, email } = createUserDto;

    const responce: ResponceUserTokenDto = {
      firstname,
      lastname,
      email,
      token: accessToken,
    };

    return responce;
  }

  async singIn(
    authCredentials: AuthCredentialsDto,
  ): Promise<ResponceUserTokenDto> {
    const { email, password } = authCredentials;
    const user: UserEntity = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken: string = await this.jwtService.sign({ id: user.id });
      const responce: ResponceUserTokenDto = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: accessToken,
      };

      return responce;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}

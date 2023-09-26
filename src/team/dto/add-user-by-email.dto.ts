import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddUserByEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  teamId: string;
}

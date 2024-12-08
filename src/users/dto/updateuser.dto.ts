import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from './createuser.dto';

export class updateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  passwordHash?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;
}

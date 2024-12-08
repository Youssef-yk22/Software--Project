import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export enum UserRole {
  Student = 'Student',
  Instructor = 'Instructor',
  Admin = 'Admin',
}

export class createUserDto {
  @IsString()
  userid: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;

  @IsEnum(UserRole)
  role: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  createdAt: Date;
}

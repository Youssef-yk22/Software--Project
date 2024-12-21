import { IsString, IsEmail, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';

export enum UserRole {
  Student = 'Student',
  Instructor = 'Instructor',
  Admin = 'Admin',
}

export class createUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  createdAt: Date;
}

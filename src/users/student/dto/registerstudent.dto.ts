import { IsString, IsEmail, MinLength, IsDate } from 'class-validator';

export class RegisterStudentDto {
  @IsString()
  userid: string; // Student-provided unique ID

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  passwordHash: string; // Student-provided hashed password

  @IsDate()
  createdAt: Date; // Student-provided creation date
}

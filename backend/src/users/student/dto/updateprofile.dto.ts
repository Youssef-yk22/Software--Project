import { IsOptional, IsString, IsArray } from 'class-validator';
import { updateUserDto } from 'src/users/dto/updateuser.dto';

export class UpdateStudentProfileDto extends updateUserDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  learningPreferences?: string[];

  @IsOptional()
  @IsArray()
  subjectsOfInterest?: string[];
}

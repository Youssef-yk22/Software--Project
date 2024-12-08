import { IsString, IsOptional } from 'class-validator';
import { createUserDto } from 'src/users/dto/createuser.dto';

export class CreateInstructorDto extends createUserDto {
  @IsString()
  expertise: string; // Field for instructor expertise

  @IsOptional()
  @IsString()
  teachingInterests?: string; // Optional teaching interests
}

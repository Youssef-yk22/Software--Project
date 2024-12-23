import { IsString, IsOptional } from 'class-validator';
import { updateUserDto } from 'src/users/dto/updateuser.dto';

export class UpdateInstructorDto extends updateUserDto {
  @IsOptional()
  @IsString()
  expertise?: string;

  @IsOptional()
  @IsString()
  teachingInterests?: string;
}

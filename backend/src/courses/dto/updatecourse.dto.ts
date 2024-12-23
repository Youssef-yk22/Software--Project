import { IsString, IsEnum, IsOptional } from 'class-validator';
import { DifficultyLevel } from './createcourse.dto';

export class updateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficultyLevel?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
  @IsOptional()
  @IsString()
  multimediaContent?: string;
  @IsOptional()
  @IsString()
  versioning?: boolean; // Flag to indicate if versioning is enabled for this update
}

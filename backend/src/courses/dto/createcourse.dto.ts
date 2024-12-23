import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum DifficultyLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export class createCourseDto {
  @IsString()
  courseId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsEnum(DifficultyLevel)
  difficultyLevel: string;

  @IsString()
  createdBy: string;

  createdAt: Date;

  @IsOptional()
  @IsString()
  multimediaContent?: string;
}

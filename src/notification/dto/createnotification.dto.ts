import { IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  content: string;
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  courseId?: string;
}

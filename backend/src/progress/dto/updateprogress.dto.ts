import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class updateProgressDto {
  @IsOptional()
  @IsNumber()
  completionPercentage?: number;
  @IsOptional()
  @IsNumber()
  averageScore?: number;

  @IsOptional()
  @IsBoolean()
  certified?: boolean;
}

import { IsString, IsOptional } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsString()
  message?: string;
}

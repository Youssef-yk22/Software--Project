import { IsString } from 'class-validator';

export class RequestCertificateDto {
  @IsString()
  userId: string;

  @IsString()
  courseId: string;
}

import { IsString } from 'class-validator';

export class EnrollStudentDto {
  @IsString()
  courseId: string; // ID of the course to enroll in
}

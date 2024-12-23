import { IsArray } from 'class-validator';

export class SubmitResponseDto {
  @IsArray()
  answers: {
    questionId: string;
    answer: string;
  }[];
}

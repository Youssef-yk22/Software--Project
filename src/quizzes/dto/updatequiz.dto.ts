import { IsArray } from 'class-validator';

export class updateQuizDto {
  @IsArray()
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
  }[];
}

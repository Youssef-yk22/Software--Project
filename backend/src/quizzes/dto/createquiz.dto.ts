import { IsArray } from 'class-validator';

export class createQuizDto {
  quizId: string;
  moduleId: string;
  @IsArray()
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
  }[];
  createdAt: Date;
}

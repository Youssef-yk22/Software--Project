export class createResponseDto {
  responseId: string;
  userId: string;
  quizId: string;
  answers: Record<string, any>[];
  score: number;
  submittedAt: Date;
}

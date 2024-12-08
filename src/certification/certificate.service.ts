import { Injectable } from '@nestjs/common';
import { ProgressService } from 'src/progress/progress.service';

@Injectable()
export class CertificationService {
  constructor(private readonly progressService: ProgressService) {}

  /**
   * Generates a certificate if the course is completed.
   * @param userId - The student's ID.
   * @param courseId - The course ID.
   * @returns A certificate string or an error if the course isn't completed.
   */
  async generateCertificate(userId: string, courseId: string): Promise<string> {
    // Check if the course is completed
    const isComplete = await this.progressService.calculateCompletion(
      userId,
      courseId,
    );
    if (!isComplete) {
      throw new Error('Course not completed yet');
    }

    // Return a certificate
    return `Certificate: User ${userId} has successfully completed Course ${courseId}`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from './models/feedback.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
  ) {}

  /**
   * Submit feedback.
   * @param userId - The ID of the user.
   * @param content - The feedback content.
   */
  async create(userId: string, content: string) {
    try {
      const feedback = await this.feedbackModel.create({
        userId: userId, // Explicitly set the userId
        content: content,
      });

      console.log('Created feedback:', feedback);

      return {
        success: true,
        feedback: {
          _id: feedback._id,
          userId: feedback.userId,
          content: feedback.content,
          createdAt: feedback.createdAt,
        },
      };
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw new Error(`Failed to create feedback: ${error.message}`);
    }
  }

  /**
   * Fetch all feedback.
   */
  async getAllFeedback() {
    return this.feedbackModel.find().exec();
  }
  /**
   * Delete feedback by ID.
   * @param feedbackId - The ID of the feedback to delete.
   */
  async deleteFeedback(feedbackId: string): Promise<{ message: string }> {
    const feedback = await this.feedbackModel.findByIdAndDelete(feedbackId);
    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }
    return { message: 'Feedback deleted successfully' };
  }
  /**
   * Fetch feedback for a specific course.
   * @param courseId - The ID of the course.
   * @returns A list of feedback for the course.
   */
  async findFeedbackByCourse(courseId: string): Promise<Feedback[]> {
    return this.feedbackModel.find({ courseId }).exec();
  }
}

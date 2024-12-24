import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('feedback')
@UseGuards(AuthGuard('jwt'))
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  /**
   * Submit feedback.
   * @param req - The authenticated user's request.
   * @param body - The feedback content.
   */
  @Post()
  async create(@Req() req, @Body() body: { content: string }) {
    const userId = req.user.userId; // Get userId from JWT token
    return this.feedbackService.create(userId, body.content);
  }

  /**
   * Fetch all feedback (admin only).
   */
  @Get()
  async getAllFeedback() {
    return this.feedbackService.getAllFeedback();
  }
  @Get('courses/:courseId/feedback')
  async viewFeedback(@Param('courseId') courseId: string) {
    return this.feedbackService.findFeedbackByCourse(courseId);
  }
}

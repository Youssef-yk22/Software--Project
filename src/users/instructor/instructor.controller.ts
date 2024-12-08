import {
  Controller,
  Post,
  Put,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles';
import { Roles } from 'src/decorators/roles';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/createinstructor.dto';
import { UpdateInstructorDto } from './dto/updateinstructor.dto';
import { createCourseDto } from 'src/courses/dto/createcourse.dto';
import { createModuleDto } from 'src/modules/dto/createmodule.dto';
import { createQuizDto } from 'src/quizzes/dto/createquiz.dto';
import { updateCourseDto } from 'src/courses/dto/updatecourse.dto';
import { ChatService } from 'src/chat/chat.service';

@Controller('instructors')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('Instructor') // Restrict routes to instructors only
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly chatservice: ChatService,
  ) {}

  /**
   * Register a new instructor.
   * @param createInstructorDto - The instructor's registration data.
   */
  @Post('register')
  async registerInstructor(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorService.registerInstructor(createInstructorDto);
  }

  /**
   * Update the instructor's profile.
   * @param req - The authenticated instructor's request.
   * @param updateInstructorDto - Updated profile details.
   */
  @Put('profile')
  async updateProfile(
    @Req() req,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    const userId = req.user.userId; // Extract userId from JWT payload
    return this.instructorService.updateProfile(userId, updateInstructorDto);
  }
  /**
   * Fetch all courses created by the instructor.
   * @param req - The authenticated instructor's request.
   */
  @Get('courses')
  async getInstructorCourses(@Req() req) {
    const userId = req.user.userId;
    return this.instructorService.getInstructorCourses(userId);
  }
  /**
   * Create a new course.
   * @param req - The authenticated instructor's request.
   * @param createCourseDto - The course creation data.
   */
  @Post('courses')
  async createCourse(@Req() req, @Body() createCourseDto: createCourseDto) {
    const userId = req.user.userId;
    return this.instructorService.createCourse(userId, createCourseDto);
  }
  /**
   * Add a module to a course.
   * @param createModuleDto - The module creation data.
   */
  @Post('courses/modules')
  async addModule(@Body() createModuleDto: createModuleDto) {
    return this.instructorService.addModule(createModuleDto);
  }
  /**
   * Create a quiz for a module.
   * @param createQuizDto - The quiz creation data.
   */
  @Post('courses/modules/quizzes')
  async createQuiz(@Body() createQuizDto: createQuizDto) {
    return this.instructorService.createQuiz(createQuizDto);
  }
  /**
   * Update a course.
   * @param courseId - The ID of the course to update.
   * @param updateCourseDto - The course update data.
   */
  @Put('courses/:courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: updateCourseDto,
  ) {
    return this.instructorService.updateCourse(courseId, updateCourseDto);
  }
  /**
   * Get all versions of a course.
   */
  @Get(':courseId/versions')
  async getCourseVersions(@Param('courseId') courseId: string) {
    return this.instructorService.getCourseVersions(courseId);
  }
  /**
   * Get student progress for a course.
   * @param courseId - The ID of the course.
   */
  @Get('courses/:courseId/progress')
  async getStudentProgress(@Param('courseId') courseId: string) {
    return this.instructorService.getStudentProgress(courseId);
  }

  /**
   * Get engagement report for a course.
   * @param courseId - The ID of the course.
   */
  @Get('courses/:courseId/engagement')
  async getEngagementReport(@Param('courseId') courseId: string) {
    return this.instructorService.getEngagementReport(courseId);
  }
  @Post('courses/:courseId/announcements')
  async postAnnouncement(
    @Req() req,
    @Param('courseId') courseId: string,
    @Body('content') content: string,
  ) {
    const instructorId = req.user.userid;
    return this.instructorService.postAnnouncement(
      courseId,
      instructorId,
      content,
    );
  }
  @Post('courses/:courseId/chats/:messageId/reply')
  async respondToQuery(
    @Req() req,
    @Param('courseId') courseId: string,
    @Param('messageId') messageId: string,
    @Body('reply') reply: string,
  ) {
    const instructorId = req.user.userid;
    return this.chatservice.respondToQuery(
      courseId,
      instructorId,
      messageId,
      reply,
    );
  }
  @Get('courses/:courseId/modules')
  async getModulesByCourse(@Param('courseId') courseId: string) {
    return this.instructorService.getModulesByCourse(courseId);
  }

  @Put('modules/:moduleId')
  async updateModule(
    @Param('moduleId') moduleId: string,
    @Body() updateModuleDto: any,
  ) {
    return this.instructorService.updateModule(moduleId, updateModuleDto);
  }
  @Get('courses/:courseId/feedback')
  async getFeedbackByCourse(@Param('courseId') courseId: string) {
    return this.instructorService.viewFeedback(courseId);
  }
  @Put('courses/:courseId/quizzes/:quizId')
  async updateQuiz(
    @Param('courseId') courseId: string,
    @Param('quizId') quizId: string,
    @Body() updateQuizDto: any,
  ) {
    return this.instructorService.updateQuiz(courseId, quizId, updateQuizDto);
  }
}

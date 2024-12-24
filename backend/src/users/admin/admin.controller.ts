import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateAdminDto } from './dto/createadmin.dto';
import { LoginAdminDto } from './dto/loginadmin.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles';
import { Roles } from 'src/decorators/roles';
import { updateUserDto } from 'src/users/dto/updateuser.dto';
import { NotificationService } from 'src/notification/notification.service';
import { FeedbackService } from 'src/feedback/feedback.service';
import { Role } from 'src/decorators/roles.enum';
import { authorizationGaurd } from 'src/guards/authotization';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Admin) // Ensure all routes are admin-restricted
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly feedbackService: FeedbackService,
  ) {}

  /**
   * Register a new admin.
   */
  @UseGuards(authorizationGaurd)
  @Post('register')
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.registerAdmin(createAdminDto);
  }

  /**
   * Admin login endpoint.
   */
  @UseGuards(authorizationGaurd)
  @Post('login')
  async login(@Body() loginDto: LoginAdminDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Fetch all users.
   */
  @UseGuards(authorizationGaurd)
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }
  @UseGuards(authorizationGaurd)
  @Put('users/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: updateUserDto,
  ) {
    return this.adminService.updateUser(userId, updateUserDto);
  }

  /**
   * Delete a user.
   */
  @UseGuards(authorizationGaurd)
  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string) {
    return this.adminService.deleteUser(userId);
  }
  /**
   * View all courses.
   */
  @UseGuards(authorizationGaurd)
  @Get('courses')
  async getAllCourses() {
    return this.adminService.getAllCourses();
  }

  /**
   * Archive a course.
   * @param courseId - The ID of the course to archive.
   */
  @UseGuards(authorizationGaurd)
  @Put('courses/:courseId/archive')
  async archiveCourse(@Param('courseId') courseId: string) {
    return this.adminService.archiveCourse(courseId);
  }

  /**
   * Delete a course.
   * @param courseId - The ID of the course to delete.
   */
  @UseGuards(authorizationGaurd)
  @Delete('courses/:courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    return this.adminService.deleteCourse(courseId);
  }
  /**
   * Send a platform-wide announcement.
   */
  @UseGuards(authorizationGaurd)
  @Post('announce')
  async sendAnnouncement(@Body() { content }: { content: string }) {
    return this.notificationService.broadcastNotification(content);
  }
  /**
   * Fetch all feedback.
   */
  @UseGuards(authorizationGaurd)
  @Get('feedback')
  async getAllFeedback() {
    return this.feedbackService.getAllFeedback();
  }

  /**
   * Delete specific feedback.
   * @param feedbackId - The ID of the feedback to delete.
   */
  @UseGuards(authorizationGaurd)
  @Delete('feedback/:feedbackId')
  async deleteFeedback(@Param('feedbackId') feedbackId: string) {
    return this.feedbackService.deleteFeedback(feedbackId);
  }
}

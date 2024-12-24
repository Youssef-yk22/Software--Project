import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateAdminDto } from './dto/createadmin.dto';
import { LoginAdminDto } from './dto/loginadmin.dto';
import { updateUserDto } from 'src/users/dto/updateuser.dto';
import { NotificationService } from 'src/notification/notification.service';
import { FeedbackService } from 'src/feedback/feedback.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles';
import { Role } from 'src/decorators/roles.enum';
import { Public } from 'src/decorators/public.decorator';
import { authorizationGaurd } from 'src/guards/authotization';

@Controller('admin')
//@UseGuards(AuthGuard('jwt'))
//@Roles(Role.Admin)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly feedbackService: FeedbackService,
  ) {}
  @Public()
  @Post('register')
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.registerAdmin(createAdminDto);
  }
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginAdminDto) {
    return this.authService.login(loginDto);
  }
  @UseGuards(authorizationGaurd)
  @Roles(Role.Admin)
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }
  @UseGuards(authorizationGaurd)
  @Roles(Role.Admin)
  @Put('users/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: updateUserDto,
  ) {
    if (!userId) throw new BadRequestException('User ID is required.');
    return this.adminService.updateUser(userId, updateUserDto);
  }
  @UseGuards(authorizationGaurd)
  @Roles(Role.Admin)
  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string) {
    if (!userId) throw new BadRequestException('User ID is required.');
    return this.adminService.deleteUser(userId);
  }
  @UseGuards(authorizationGaurd)
  @Roles(Role.Admin)
  @Get('courses')
  async getAllCourses() {
    return this.adminService.getAllCourses();
  }
  @UseGuards(authorizationGaurd)
  @Roles(Role.Admin)
  @Put('courses/:courseId/archive')
  async archiveCourse(@Param('courseId') courseId: string) {
    if (!courseId) throw new BadRequestException('Course ID is required.');
    return this.adminService.archiveCourse(courseId);
  }
  @UseGuards(authorizationGaurd)
  @Roles(Role.Admin)
  @Delete('courses/:courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    if (!courseId) throw new BadRequestException('Course ID is required.');
    return this.adminService.deleteCourse(courseId);
  }
  @UseGuards(authorizationGaurd)
  @Roles(Role.Admin)
  @Post('announce')
  async sendAnnouncement(@Body() { content }: { content: string }) {
    if (!content)
      throw new BadRequestException('Announcement content is required.');
    return this.notificationService.broadcastNotification(content);
  }
  @UseGuards(authorizationGaurd)
  @Roles(Role.Admin)
  @Get('feedback')
  async getAllFeedback() {
    return this.feedbackService.getAllFeedback();
  }
  @UseGuards(authorizationGaurd)
  @Roles(Role.Admin)
  @Delete('feedback/:feedbackId')
  async deleteFeedback(@Param('feedbackId') feedbackId: string) {
    if (!feedbackId) throw new BadRequestException('Feedback ID is required.');
    return this.feedbackService.deleteFeedback(feedbackId);
  }
}

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentService } from './student.service';
import { SubmitResponseDto } from 'src/responses/dto/SubmitResponse.dto';
import { SendMessageDto } from 'src/chat/dto/sendmessage.dto';
import { RolesGuard } from 'src/guards/roles';
import { Roles } from 'src/decorators/roles';
import { Role } from 'src/decorators/roles.enum';
import { authorizationGaurd } from 'src/guards/authotization';

@Controller('students')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Apply AuthGuard and RolesGuard
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Roles(Role.Student)
  @UseGuards(authorizationGaurd)
  @Get('courses') // Restrict access to students
  async browseCourses() {
    return this.studentService.browseCourses();
  }
  @UseGuards(authorizationGaurd)
  @Post('courses/:courseId/enroll')
  @Roles(Role.Student) // Restrict access to students
  async enrollInCourse(@Req() req, @Param('courseId') courseId: string) {
    // Get userId from JWT token
    const userId = req.user.userId; // Make sure this matches your JWT payload structure

    console.log('Enrolling user:', {
      userId: userId,
      courseId: courseId,
    });

    return this.studentService.enrollInCourse(userId, courseId); // Pass courseId directly
  }
  @UseGuards(authorizationGaurd)
  @Get('courses/:Id')
  @Roles(Role.Student) // Restrict access to students
  async getCourseDetails(@Param('Id') Id: string) {
    return this.studentService.getCourseDetails(Id);
  }
  @UseGuards(authorizationGaurd)
  @Post('courses/:courseId/notes')
  @Roles(Role.Student) // Restrict access to students
  async addNote(
    @Req() req,
    @Param('courseId') courseId: string,
    @Body() createNoteDto: { content: string; noteId: string },
  ) {
    // Extract userId from JWT token payload
    const userId = req.user.userId; // Make sure this matches your JWT payload structure

    console.log('Adding note:', {
      userId,
      courseId,
      createNoteDto,
    });

    return this.studentService.addNote(userId, courseId, createNoteDto);
  }
  @UseGuards(authorizationGaurd)
  @Put('courses/:courseId/notes/:id')
  @Roles(Role.Student)
  async updateNote(
    @Req() req,
    @Param('courseId') courseId: string,
    @Param('id') id: string,
    @Body() updateNoteDto: { content: string },
  ) {
    const userId = req.user.userId;

    console.log('Updating note:', {
      userId,
      courseId,
      noteId: id,
      updateNoteDto,
    });

    return this.studentService.updateNote(userId, courseId, id, updateNoteDto);
  }
  @UseGuards(authorizationGaurd)
  @Delete('courses/:courseId/notes/:id')
  @Roles(Role.Student)
  async deleteNote(
    @Req() req,
    @Param('courseId') courseId: string,
    @Param('id') id: string,
  ) {
    const userId = req.user.userId;

    console.log('Deleting note:', {
      userId,
      courseId,
      noteId: id,
    });

    return this.studentService.deleteNote(userId, courseId, id);
  }
  @UseGuards(authorizationGaurd)
  @Get('courses/:courseId/quizzes')
  @Roles(Role.Student) // Restrict access to students
  async fetchQuizzes(@Param('courseId') courseId: string) {
    return this.studentService.fetchQuizzes(courseId);
  }
  @UseGuards(authorizationGaurd)
  @Post('courses/:courseId/quizzes/:quizId/response')
  @Roles(Role.Student) // Restrict access to students
  async submitQuizResponse(
    @Req() req,
    @Param('quizId') quizId: string,
    @Body() responseDto: SubmitResponseDto,
  ) {
    const userId = req.user.userid;
    return this.studentService.submitQuizResponse(userId, quizId, responseDto);
  }
  @UseGuards(authorizationGaurd)
  @Post('courses/:courseId/chats/notify')
  @Roles(Role.Student) // Restrict access to students
  async sendMessageAndNotify(
    @Req() req,
    @Param('courseId') courseId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    const userId = req.user.userId;
    
    console.log('Sending message:', {
      userId,
      courseId,
      message: sendMessageDto
    });

    return this.studentService.sendMessageAndNotify(
      courseId,
      userId,
      sendMessageDto,
    );
  }
}

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

@Controller('students')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Apply AuthGuard and RolesGuard
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('courses')
  @Roles('Student') // Restrict access to students
  async browseCourses() {
    return this.studentService.browseCourses();
  }

  @Post('courses/:courseId/enroll')
  @Roles('Student') // Restrict access to students
  async enrollInCourse(@Req() req, @Param('courseId') courseId: string) {
    const userid = req.user.userid;
    return this.studentService.enrollInCourse(userid, { courseId });
  }

  @Get('courses/:courseId')
  @Roles('Student') // Restrict access to students
  async getCourseDetails(@Param('courseId') courseId: string) {
    return this.studentService.getCourseDetails(courseId);
  }

  @Post('courses/:courseId/notes')
  @Roles('Student') // Restrict access to students
  async addNote(
    @Req() req,
    @Param('courseId') courseId: string,
    @Body() createNoteDto: any,
  ) {
    const userId = req.user.userid;
    return this.studentService.addNote(userId, courseId, createNoteDto);
  }

  @Put('courses/:courseId/notes/:noteId')
  @Roles('Student') // Restrict access to students
  async updateNote(
    @Req() req,
    @Param('noteId') noteId: string,
    @Body() updateNoteDto: any,
  ) {
    const userId = req.user.userid;
    return this.studentService.updateNote(userId, noteId, updateNoteDto);
  }

  @Delete('courses/:courseId/notes/:noteId')
  @Roles('Student') // Restrict access to students
  async deleteNote(@Req() req, @Param('noteId') noteId: string) {
    const userId = req.user.userid;
    return this.studentService.deleteNote(userId, noteId);
  }

  @Get('courses/:courseId/quizzes')
  @Roles('Student') // Restrict access to students
  async fetchQuizzes(@Param('courseId') courseId: string) {
    return this.studentService.fetchQuizzes(courseId);
  }

  @Post('courses/:courseId/quizzes/:quizId/response')
  @Roles('Student') // Restrict access to students
  async submitQuizResponse(
    @Req() req,
    @Param('quizId') quizId: string,
    @Body() responseDto: SubmitResponseDto,
  ) {
    const userId = req.user.userid;
    return this.studentService.submitQuizResponse(userId, quizId, responseDto);
  }

  @Post('courses/:courseId/chats/notify')
  @Roles('Student') // Restrict access to students
  async sendMessageAndNotify(
    @Req() req,
    @Param('courseId') courseId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    const userId = req.user.userid;
    return this.studentService.sendMessageAndNotify(
      courseId,
      userId,
      sendMessageDto,
    );
  }
}

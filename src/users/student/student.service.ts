import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from 'src/courses/models/courses.schema';
import { NotesService } from 'src/notes/notes.service';
import { UsersService } from 'src/users/users.service';
import { EnrollStudentDto } from './dto/enrollstudent.dto';
import { UpdateStudentProfileDto } from './dto/updateprofile.dto';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { ResponsesService } from 'src/responses/responses.service';
import { SubmitResponseDto } from 'src/responses/dto/SubmitResponse.dto';
import { ChatService } from 'src/chat/chat.service';
import { NotificationService } from 'src/notification/notification.service';
import { SendMessageDto } from 'src/chat/dto/sendmessage.dto';
import { User, UserDocument } from '../models/users.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly notesService: NotesService,
    private readonly usersService: UsersService,
    private readonly quizzesService: QuizzesService,
    private readonly responsesService: ResponsesService,
    private readonly chatService: ChatService,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Register a new student (handled in UsersService).
   */
  async registerStudent(registerStudentDto: any) {
    return this.usersService.create({ ...registerStudentDto, role: 'Student' });
  }

  /**
   * Update a student's profile.
   */
  async updateProfile(
    userid: string,
    updateProfileDto: UpdateStudentProfileDto,
  ) {
    const user = await this.usersService.update(userid, updateProfileDto);
    if (!user) {
      throw new NotFoundException('Student not found');
    }
    return user;
  }

  /**
   * Browse available courses.
   */
  async browseCourses() {
    return this.courseModel.find().select('-enrolledStudents').exec();
  }

  /**
   * Enroll a student in a course.
   */
  async enrollInCourse(userid: string, enrollStudentDto: EnrollStudentDto) {
    const course = await this.courseModel.findOne({
      courseId: enrollStudentDto.courseId,
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const userObjectId = new Types.ObjectId(userid);

    if (course.enrolledStudents.includes(userObjectId)) {
      throw new Error('User is already enrolled in this course');
    }

    course.enrolledStudents.push(userObjectId);
    return course.save();
  }

  /**
   * Get course details for a student.
   */
  async getCourseDetails(courseId: string) {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  /**
   * Add a note to a course.
   */
  async addNote(userId: string, courseId: string, createNoteDto: any) {
    return this.notesService.create({ ...createNoteDto, userId, courseId });
  }

  /**
   * Update a student's note.
   */
  async updateNote(userId: string, noteId: string, updateNoteDto: any) {
    const note = await this.notesService.findOne(noteId);
    if (!note || note.userId !== userId) {
      throw new NotFoundException('Note not found or access denied');
    }
    return this.notesService.update(noteId, updateNoteDto);
  }

  /**
   * Delete a student's note.
   */
  async deleteNote(userId: string, noteId: string) {
    const note = await this.notesService.findOne(noteId);
    if (!note || note.userId !== userId) {
      throw new NotFoundException('Note not found or access denied');
    }
    await this.notesService.remove(noteId);
    return { message: 'Note deleted successfully' };
  }
  /**
   * Fetch all quizzes for a course.
   * @param courseId - The ID of the course.
   * @returns List of quizzes.
   */
  async fetchQuizzes(courseId: string) {
    const quizzes = await this.quizzesService.findAll();
    const courseQuizzes = quizzes.filter((quiz) => quiz.moduleId === courseId);

    if (!courseQuizzes.length) {
      throw new NotFoundException('No quizzes found for this course');
    }

    return courseQuizzes;
  }

  /**
   * Submit a quiz response and calculate the score.
   * @param userId - The ID of the student.
   * @param quizId - The ID of the quiz.
   * @param submitResponseDto - The student's responses to the quiz.
   * @returns The calculated score and feedback.
   */
  async submitQuizResponse(
    userId: string,
    quizId: string,
    submitResponseDto: SubmitResponseDto,
  ) {
    const quiz = await this.quizzesService.findOne(quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const { answers } = submitResponseDto;
    let score = 0;

    // Calculate score
    quiz.questions.forEach((question: any) => {
      const userAnswer = answers.find(
        (ans) => ans.questionId === question.questionId,
      )?.answer;
      if (userAnswer && userAnswer === question.correctAnswer) {
        score += 1;
      }
    });

    // Map SubmitResponseDto to createResponseDto
    const response = {
      responseId: `${quizId}-${userId}-${Date.now()}`,
      userId,
      quizId,
      answers,
      score,
      submittedAt: new Date(),
    };

    return this.responsesService.create(response);
  }
  /**
   * Validate that a course exists.
   * @param courseId - The ID of the course.
   */
  async validateCourseExistence(courseId: string) {
    // This method assumes a CourseService or similar exists
    const course = await this.usersService.findOne(courseId); // Adjust with your course validation logic
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
  }

  /**
   * Fetch students enrolled in a course.
   * @param courseId - The ID of the course.
   * @returns List of enrolled students.
   */
  async findUsersByIds(userIds: string[]): Promise<User[]> {
    return this.userModel.find({ _id: { $in: userIds } }).exec();
  }

  /**
   * Send a message and notify all students in the course/module.
   * @param courseId - The ID of the course/module.
   * @param userId - The ID of the sender.
   * @param sendMessageDto - The message data.
   * @returns The created message.
   */
  async sendMessageAndNotify(
    courseId: string,
    userId: string,
    sendMessageDto: SendMessageDto,
  ) {
    // Validate course existence
    await this.validateCourseExistence(courseId);

    // Send the message
    const message = await this.chatService.sendMessage(
      courseId,
      userId,
      sendMessageDto,
    );

    // Fetch students enrolled in the course
    const enrolledStudents = await this.userModel
      .find({ enrolledCourses: courseId })
      .exec();

    // Notify all students except the sender
    const notifications = enrolledStudents
      .filter((student) => student.id !== userId)
      .map((student) => ({
        userId: student.id,
        content: `New message in course ${courseId}: "${sendMessageDto.message}"`,
      }));

    await Promise.all(
      notifications.map((notification) =>
        this.notificationService.createNotification(notification.userId, {
          content: notification.content,
        }),
      ),
    );

    return message;
  }
}

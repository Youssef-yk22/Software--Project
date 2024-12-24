import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from 'src/courses/models/courses.schema';
import { NotesService } from 'src/notes/notes.service';
import { UsersService } from 'src/users/users.service';
//import { EnrollStudentDto } from './dto/enrollstudent.dto';
import { UpdateStudentProfileDto } from './dto/updateprofile.dto';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { ResponsesService } from 'src/responses/responses.service';
import { SubmitResponseDto } from 'src/responses/dto/SubmitResponse.dto';
import { ChatService } from 'src/chat/chat.service';
import { NotificationService } from 'src/notification/notification.service';
import { SendMessageDto } from 'src/chat/dto/sendmessage.dto';
import { User, UserDocument } from '../models/users.schema';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Enrollment,
  EnrollmentDocument,
} from 'src/courses/models/enrollment.schema';
import { Note, NoteDocument } from 'src/notes/models/notes.schema';

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
    @InjectModel(Enrollment.name)
    private enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(Note.name)
    private readonly noteModel: Model<NoteDocument>,
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
    return this.courseModel.find({ status: 'Active' }).exec();
  }

  /**
   * Enroll a student in a course.
   */
  async enrollInCourse(userId: string, courseId: string) {
    console.log('Enrolling with:', { userId, courseId });

    // Convert userId and courseId to ObjectId
    const userObjectId = new Types.ObjectId(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const courseObjectId = new Types.ObjectId(courseId);

    // First, check if the course exists using _id
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Check if student is already enrolled
    const isAlreadyEnrolled = course.enrolledStudents
      .map((id) => id.toString())
      .includes(userObjectId.toString());
    if (isAlreadyEnrolled) {
      throw new ConflictException('Student is already enrolled in this course');
    }

    try {
      // Add student to enrolledStudents array using _id
      const updatedCourse = await this.courseModel
        .findByIdAndUpdate(
          courseId,
          {
            $push: { enrolledStudents: userObjectId },
          },
          {
            new: true,
            runValidators: true,
          },
        )
        .populate('enrolledStudents');

      // Create enrollment record
      const enrollment = new this.enrollmentModel({
        userId: userObjectId,
        courseId: courseId, // This will store the MongoDB _id
        enrollmentDate: new Date(),
        status: 'active',
      });

      await enrollment.save();

      console.log('Enrollment successful:', {
        courseId,
        userId: userObjectId,
        enrolledStudents: updatedCourse.enrolledStudents,
      });

      return {
        message: 'Successfully enrolled in course',
        course: updatedCourse,
        enrollment: enrollment,
      };
    } catch (error) {
      console.error('Enrollment error:', error);
      throw new Error(`Failed to enroll in course: ${error.message}`);
    }
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
  async updateNote(
    userId: string,
    courseId: string,
    noteId: string,
    updateNoteDto: { content: string },
  ) {
    // Convert noteId to ObjectId
    const noteObjectId = new Types.ObjectId(noteId);

    // First verify the note exists and belongs to the user
    const note = await this.noteModel.findOne({
      _id: noteObjectId,
      userId: userId,
      courseId: courseId,
    });

    if (!note) {
      throw new NotFoundException('Note not found or access denied');
    }

    try {
      const updatedNote = await this.noteModel.findByIdAndUpdate(
        noteObjectId,
        {
          $set: {
            content: updateNoteDto.content,
            lastUpdated: new Date(),
          },
        },
        { new: true },
      );

      return {
        success: true,
        note: updatedNote,
      };
    } catch (error) {
      console.error('Error updating note:', error);
      throw new Error(`Failed to update note: ${error.message}`);
    }
  }

  /**
   * Delete a student's note.
   */
  async deleteNote(userId: string, courseId: string, noteId: string) {
    // Convert noteId to ObjectId
    const noteObjectId = new Types.ObjectId(noteId);

    // First verify the note exists and belongs to the user
    const note = await this.noteModel.findOne({
      _id: noteObjectId,
      userId: userId,
      courseId: courseId,
    });

    if (!note) {
      throw new NotFoundException('Note not found or access denied');
    }

    try {
      await this.noteModel.findByIdAndDelete(noteObjectId);

      return {
        success: true,
        message: 'Note successfully deleted',
      };
    } catch (error) {
      console.error('Error deleting note:', error);
      throw new Error(`Failed to delete note: ${error.message}`);
    }
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

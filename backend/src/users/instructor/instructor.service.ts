import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateInstructorDto } from './dto/createinstructor.dto';
import { UpdateInstructorDto } from './dto/updateinstructor.dto';
import { Course, CourseDocument } from 'src/courses/models/courses.schema';
import { Modules, ModuleDocument } from 'src/modules/models/modules.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createCourseDto } from 'src/courses/dto/createcourse.dto';
import { createModuleDto } from 'src/modules/dto/createmodule.dto';
import { createQuizDto } from 'src/quizzes/dto/createquiz.dto';
import { Quiz, QuizDocument } from 'src/quizzes/models/quizzes.schema';
import { updateCourseDto } from 'src/courses/dto/updatecourse.dto';
import {
  Progress,
  ProgressDocument,
} from 'src/progress/models/progress.schema';
import { ChatService } from 'src/chat/chat.service';
import { NotificationService } from 'src/notification/notification.service';
import { SendMessageDto } from 'src/chat/dto/sendmessage.dto';
import { CreateNotificationDto } from 'src/notification/dto/createnotification.dto';
import { FeedbackService } from 'src/feedback/feedback.service';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { ModulesService } from 'src/modules/modules.service';

@Injectable()
export class InstructorService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    @InjectModel(Modules.name)
    private readonly moduleModel: Model<ModuleDocument>,
    @InjectModel(Quiz.name)
    private readonly quizModel: Model<QuizDocument>,
    @InjectModel(Progress.name)
    private readonly progressModel: Model<ProgressDocument>,
    private readonly chatService: ChatService,
    private readonly notificationService: NotificationService,
    private readonly quizzesService: QuizzesService,
    private readonly feedbackService: FeedbackService,
    private readonly modulesService: ModulesService,
  ) {}

  /**
   * Register a new instructor.
   * @param createInstructorDto - The instructor's registration data.
   * @returns The created instructor user.
   */
  async registerInstructor(createInstructorDto: CreateInstructorDto) {
    return this.usersService.create({
      ...createInstructorDto,
      role: 'Instructor',
    });
  }

  /**
   * Update an instructor's profile.
   * @param userId - The instructor's user ID.
   * @param updateInstructorDto - Updated profile details.
   * @returns The updated instructor profile.
   */
  async updateProfile(
    userId: string,
    updateInstructorDto: UpdateInstructorDto,
  ) {
    const updatedUser = await this.usersService.update(
      userId,
      updateInstructorDto,
    );
    if (!updatedUser) {
      throw new NotFoundException('Instructor not found');
    }
    return updatedUser;
  }
  /**
   * Get all courses created by an instructor.
   * @param instructorId - The instructor's user ID.
   * @returns List of courses created by the instructor.
   */
  async getInstructorCourses(instructorId: string) {
    return this.courseModel.find({ createdBy: instructorId }).exec();
  }
  /**
   * Create a new course.
   * @param instructorId - The instructor's user ID.
   * @param createCourseDto - The course creation data.
   * @returns The created course.
   */
  async createCourse(instructorId: string, createCourseDto: createCourseDto) {
    const newCourse = new this.courseModel({
      ...createCourseDto,
      createdBy: instructorId,
      createdAt: new Date(),
    });
    return newCourse.save();
  }
  /**
   * Add a module to a course.
   * @param createModuleDto - The module creation data.
   * @returns The created module.
   */
  async addModule(createModuleDto: createModuleDto) {
    const newModule = new this.moduleModel({
      ...createModuleDto,
      createdAt: new Date(),
    });
    return newModule.save();
  }
  /**
   * Create a quiz for a module.
   * @param createQuizDto - The quiz creation data.
   * @returns The created quiz.
   */
  async createQuiz(createQuizDto: createQuizDto) {
    const newQuiz = new this.quizModel({
      ...createQuizDto,
      createdAt: new Date(),
    });
    return newQuiz.save();
  }
  /**
   * Update a course.
   * @param courseId - The course ID.
   * @param updateCourseDto - The course update data.
   * @returns The updated course.
   */
  async updateCourse(courseId: string, updateCourseDto: updateCourseDto) {
    return this.courseModel
      .findByIdAndUpdate(courseId, updateCourseDto, { new: true })
      .exec();
  }
  /**
   * Get progress for all students in a course.
   * @param courseId - The course ID.
   */
  async getStudentProgress(courseId: string) {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.progressModel.find({ courseId }).exec();
  }

  /**
   * Get engagement report for a specific course.
   * @param courseId - The course ID.
   */
  async getEngagementReport(courseId: string) {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Fetch all progress for the course
    const progress = await this.progressModel.find({ courseId }).exec();

    // Aggregate engagement data (example: time spent, average completion)
    const report = {
      totalStudents: progress.length,
      averageCompletion:
        progress.reduce((sum, p) => sum + p.completionPercentage, 0) /
        (progress.length || 1),
      lastAccessed: progress.map((p) => ({
        userId: p.userId,
        lastAccessed: p.lastAccessed,
      })),
    };

    return report;
  }
  /**
   * Send a message in the course chat.
   * @param courseId - The ID of the course.
   * @param instructorId - The ID of the instructor sending the message.
   * @param sendMessageDto - The message data.
   */
  async sendMessage(
    courseId: string,
    instructorId: string,
    sendMessageDto: SendMessageDto,
  ) {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.chatService.sendMessage(courseId, instructorId, sendMessageDto);
  }

  /**
   * Broadcast an announcement to the course.
   * @param courseId - The ID of the course.
   * @param instructorId - The ID of the instructor sending the announcement.
   * @param announcement - The announcement content.
   */
  async broadcastAnnouncement(
    courseId: string,
    instructorId: string,
    announcement: string,
  ) {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const notificationDto: CreateNotificationDto = {
      content: `Announcement from instructor: ${announcement}`,
      courseId,
    };

    return this.notificationService.createNotification(null, notificationDto);
  }
  async postAnnouncement(
    courseId: string,
    instructorId: string,
    content: string,
  ) {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const notificationDto: CreateNotificationDto = {
      content: `Announcement from ${instructorId}: ${content}`,
      courseId,
    };

    return this.notificationService.createNotification(null, notificationDto);
  }
  async updateCourseDetails(courseId: string, updateCourseDto: any) {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (updateCourseDto.versioning) {
      // Save the current state to the versions array
      course.versions.push({
        title: course.title,
        description: course.description,
        updatedAt: new Date(),
      });
    }
    Object.assign(course, updateCourseDto);
    return course.save();
  }
  /**
   * Get all versions of a course.
   */
  async getCourseVersions(courseId: string) {
    const course = await this.courseModel.findOne({ courseId });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course.versions;
  }

  async updateModule(moduleId: string, updateModuleDto: any) {
    const module = await this.modulesService.findOne(moduleId);
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    Object.assign(module, updateModuleDto);
    return this.modulesService.update(moduleId, module);
  }
  async getModulesByCourse(courseId: string) {
    return this.modulesService.findByCourseId(courseId);
  }

  async updateQuiz(courseId: string, quizId: string, updateQuizDto: any) {
    const quiz = await this.quizzesService.findOne(quizId);
    if (!quiz || quiz.moduleId !== courseId) {
      throw new NotFoundException('Quiz not found or invalid course');
    }

    Object.assign(quiz, updateQuizDto);
    return this.quizzesService.update(quizId, quiz);
  }

  async viewFeedback(courseId: string) {
    return this.feedbackService.findFeedbackByCourse(courseId);
  }
}

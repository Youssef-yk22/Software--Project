import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { createUserDto } from 'src/users/dto/createuser.dto';
import { updateUserDto } from 'src/users/dto/updateuser.dto';
import { Course, CourseDocument } from 'src/courses/models/courses.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) {}

  async registerAdmin(createAdminDto: createUserDto) {
    return this.usersService.create({ ...createAdminDto, role: 'Admin' });
  }

  async getAllUsers() {
    return this.usersService.findAll();
  }

  async updateUser(userId: string, updateUserDto: updateUserDto) {
    if (!isValidObjectId(userId))
      throw new BadRequestException('Invalid User ID.');

    const user = await this.usersService.update(userId, updateUserDto);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found.`);
    return user;
  }

  async deleteUser(userId: string) {
    if (!isValidObjectId(userId))
      throw new BadRequestException('Invalid User ID.');

    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found.`);
    return this.usersService.remove(userId);
  }

  async getAllCourses() {
    return this.courseModel.find().exec();
  }

  async archiveCourse(courseId: string) {
    if (!isValidObjectId(courseId))
      throw new BadRequestException('Invalid Course ID.');

    const course = await this.courseModel.findOneAndUpdate(
      { _id: courseId },
      { status: 'Archived' },
      { new: true },
    );
    if (!course)
      throw new NotFoundException(`Course with ID ${courseId} not found.`);
    return course;
  }

  async deleteCourse(courseId: string) {
    if (!isValidObjectId(courseId))
      throw new BadRequestException('Invalid Course ID.');

    const course = await this.courseModel.findOneAndDelete({ _id: courseId });
    if (!course)
      throw new NotFoundException(`Course with ID ${courseId} not found.`);
    return { message: `Course with ID ${courseId} has been deleted.` };
  }
  async addCourse(createCourseDto: createUserDto) {
    try {
      const course = new this.courseModel(createCourseDto);
      return await course.save();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Failed to create course.');
    }
  }
}

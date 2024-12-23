import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { createUserDto } from 'src/users/dto/createuser.dto';
import { updateUserDto } from 'src/users/dto/updateuser.dto';
import { Course, CourseDocument } from 'src/courses/models/courses.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) {}

  /**
   * Register a new admin.
   * @param createAdminDto - The details of the new admin.
   */
  async registerAdmin(createAdminDto: createUserDto) {
    return this.usersService.create({ ...createAdminDto, role: 'Admin' });
  }

  /**
   * Fetch all users.
   */
  async getAllUsers() {
    return this.usersService.findAll();
  }

  async updateUser(userId: string, updateUserDto: updateUserDto) {
    const user = await this.usersService.update(userId, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Delete a user by ID.
   * @param userId - The ID of the user to delete.
   */
  async deleteUser(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersService.remove(userId);
  }
  /**
   * Fetch all courses.
   */
  async getAllCourses() {
    return this.courseModel.find().exec();
  }

  /**
   * Archive a course.
   * @param courseId - The ID of the course to archive.
   */
  async archiveCourse(courseId: string) {
    const course = await this.courseModel.findOneAndUpdate(
      { courseId },
      { status: 'Archived' },
      { new: true },
    );
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  /**
   * Delete a course.
   * @param courseId - The ID of the course to delete.
   */
  async deleteCourse(courseId: string) {
    const course = await this.courseModel.findOneAndDelete({ courseId });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return { message: `Course ${courseId} deleted successfully` };
  }
}

import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/courses/models/courses.schema';
import { BackupModule } from 'src/backup/backup.module';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    BackupModule,
    FeedbackModule,
    NotificationModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

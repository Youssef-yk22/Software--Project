import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { Course, CourseSchema } from 'src/courses/models/courses.schema';
import { Modules, ModulesSchema } from 'src/modules/models/modules.schema';
import { Quiz, QuizSchema } from 'src/quizzes/models/quizzes.schema';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { ModulesModule } from 'src/modules/modules.module';
import { UsersModule } from 'src/users/users.module';
import { ChatModule } from 'src/chat/chat.module';
import { NotificationModule } from 'src/notification/notification.module';
import { Progress, ProgressSchema } from 'src/progress/models/progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Modules.name, schema: ModulesSchema },
      { name: Quiz.name, schema: QuizSchema },
      { name: Progress.name, schema: ProgressSchema },
    ]),
    UsersModule, // Add UsersModule here
    ChatModule,
    NotificationModule,
    QuizzesModule,
    FeedbackModule,
    ModulesModule,
  ],
  controllers: [InstructorController],
  providers: [InstructorService],
  exports: [InstructorService],
})
export class InstructorModule {}

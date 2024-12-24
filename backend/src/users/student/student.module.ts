import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Course, CourseSchema } from 'src/courses/models/courses.schema';
import { NotesModule } from 'src/notes/notes.module';
import { UsersModule } from 'src/users/users.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { ResponsesModule } from 'src/responses/responses.module';
import { ChatModule } from 'src/chat/chat.module';
import { NotificationModule } from 'src/notification/notification.module';
import { User, UserSchema } from '../models/users.schema';
import { APP_GUARD } from '@nestjs/core';
import { ConditionalAuthGuard } from 'src/guards/authentication';
import {
  Enrollment,
  EnrollmentSchema,
} from 'src/courses/models/enrollment.schema';
import { Note, NoteSchema } from 'src/notes/models/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: User.name, schema: UserSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: Note.name, schema: NoteSchema },
    ]),
    NotesModule,
    UsersModule,
    QuizzesModule,
    ResponsesModule,
    ChatModule,
    NotificationModule,
    NotesModule,
  ],
  controllers: [StudentController],
  providers: [
    StudentService,
    {
      provide: APP_GUARD,
      useClass: ConditionalAuthGuard,
    },
  ],
})
export class StudentModule {}

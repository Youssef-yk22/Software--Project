import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { NotesModule } from './notes/notes.module';
import { ProgressModule } from './progress/progress.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ResponsesModule } from './responses/responses.module';
import { StudentModule } from './users/student/student.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './users/admin/admin.module';
import { AuditModule } from './audit/audit.module';
import { BackupModule } from './backup/backup.module';
import { CertificationModule } from './certification/certificate.module';
import { ChatModule } from './chat/chat.module';
import { FeedbackModule } from './feedback/feedback.module';
import { NotificationModule } from './notification/notification.module';
import { InstructorModule } from './users/instructor/instructor.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables globally available
    }),

    // Configure MongoDB connection using the DATABASE_URL from the .env file
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Fetch the URL from .env
      }),
    }),

    // Other modules
    UsersModule,
    CoursesModule,
    ModulesModule,
    NotesModule,
    ProgressModule,
    QuizzesModule,
    ResponsesModule,
    StudentModule,
    AuthModule,
    AdminModule,
    AuditModule,
    BackupModule,
    CertificationModule,
    ChatModule,
    FeedbackModule,
    NotificationModule,
    InstructorModule,
  ],
})
export class AppModule {}

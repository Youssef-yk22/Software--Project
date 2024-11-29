import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { NotesModule } from './notes/notes.module';
import { ProgressModule } from './progress/progress.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ResponsesModule } from './responses/responses.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Database:Database123@cluster0.euppp.mongodb.net/',
    ),
    UsersModule,
    CoursesModule,
    ModulesModule,
    NotesModule,
    ProgressModule,
    QuizzesModule,
    ResponsesModule,
  ],
})
export class AppModule {}

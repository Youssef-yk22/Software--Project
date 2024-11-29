import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  @Prop({ type: String, unique: true, required: true })
  quizId: string;

  @Prop({ type: String, required: true })
  moduleId: string;

  @Prop({ type: Array, required: true })
  questions: Record<string, any>[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

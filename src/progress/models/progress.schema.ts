import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProgressDocument = Progress & Document;

@Schema()
export class Progress {
  @Prop({ type: String, unique: true, required: true })
  progressId: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  courseId: string;

  @Prop({ type: Number, required: true })
  completionPercentage: number;

  @Prop({ type: Date, required: true })
  lastAccessed: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResponseDocument = Response & Document;

@Schema()
export class Response {
  @Prop({ type: String, unique: true, required: true })
  responseId: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  quizId: string;

  @Prop({ type: Array, required: true })
  answers: Record<string, any>[];

  @Prop({ type: Number, required: true })
  score: number;

  @Prop({ type: Date, default: Date.now })
  submittedAt: Date;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);

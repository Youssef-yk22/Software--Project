import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ type: String, unique: true, required: true })
  noteId: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String })
  courseId?: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  lastUpdated: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ type: String, unique: true, required: true })
  courseId: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  })
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';

  @Prop({ type: String, required: true })
  createdBy: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  enrolledStudents: Types.ObjectId[]; // References to enrolled students

  @Prop({ type: [String], default: [] })
  resources: string[]; // URLs of multimedia resources like videos or PDFs

  @Prop({ type: String, enum: ['Active', 'Archived'], default: 'Active' })
  status: 'Active' | 'Archived'; // New property to track course status
  // Add a versions field for version control
  @Prop({
    type: Array,
    default: [],
  })
  versions: {
    title: string;
    description: string;
    updatedAt: Date;
  }[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

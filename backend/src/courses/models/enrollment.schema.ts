import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EnrollmentDocument = Enrollment & Document;

@Schema()
export class Enrollment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  courseId: string;

  @Prop({ default: Date.now })
  enrollmentDate: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);

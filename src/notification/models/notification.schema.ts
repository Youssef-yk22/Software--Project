import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Boolean, default: false })
  read: boolean;

  @Prop({ type: Boolean, default: false })
  global: boolean; // New property for platform-wide announcements

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

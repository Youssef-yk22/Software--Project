import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ type: String, required: true })
  courseId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
  @Prop({
    type: [
      {
        senderId: { type: String, required: true },
        reply: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  replies: {
    senderId: string;
    reply: string;
    timestamp: Date;
  }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

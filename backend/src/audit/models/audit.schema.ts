import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditDocument = Audit & Document;

@Schema()
export class Audit {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  event: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModuleDocument = Modules & Document;

@Schema()
export class Modules {
  @Prop({ type: String, unique: true, required: true })
  moduleId: string;

  @Prop({ type: String, required: true })
  courseId: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Array })
  resources: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ModulesSchema = SchemaFactory.createForClass(Modules);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BackupDocument = Backup & Document;

@Schema()
export class Backup {
  @Prop({ type: String, unique: true, required: true })
  backupId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: String, required: true })
  dataType: string; // E.g., "User Accounts", "Course Progress"

  @Prop({ type: String, required: true })
  filePath: string; // Path to the backup file
}

export const BackupSchema = SchemaFactory.createForClass(Backup);

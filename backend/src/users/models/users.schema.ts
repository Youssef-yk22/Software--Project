import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/decorators/roles.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  //@Prop({ type: String, unique: true, required: true })
  //userId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ required: true, enum: Object.values(Role) })
  role: Role;

  @Prop({ type: String })
  profilePictureUrl?: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

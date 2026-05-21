import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RoleType {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true, enum: RoleType })
  name: string;

  @Prop({ default: '' })
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

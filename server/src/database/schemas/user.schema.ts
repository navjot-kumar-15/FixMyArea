import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ default: '' })
  full_name: string;

  @Prop({ default: '' })
  first_name: string;

  @Prop({ default: '' })
  last_name: string;

  @Prop({ default: '' })
  profile_picture_url: string;

  @Prop({ default: '', index: true })
  email: string;

  @Prop({ default: '' })
  password: string;

  @Prop({ default: '' })
  refresh_token: string;

  @Prop({ default: '', index: true })
  phone_number: string;

  @Prop({ default: false })
  is_phone_number_verified: boolean;

  @Prop({ default: false })
  is_email_verified: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Role' })
  role_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  address_id: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  is_banned: boolean;

  @Prop({ type: Boolean, default: false })
  is_blocked_by_admin: boolean;

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ is_deleted: 1, createdAt: 1, email: 1, phone_number: 1 });

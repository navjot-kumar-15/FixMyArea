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

  @Prop({ default: '', index: true })
  phone_number: string;

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

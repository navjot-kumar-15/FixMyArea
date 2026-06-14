// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export enum RoleType {
//   ADMIN = 'admin',
//   USER = 'user',
//   GUEST = 'guest',
//   WORKER = 'worker',
// }

// @Schema({ timestamps: true })
// export class Role extends Document {
//   @Prop({ required: true, unique: true, enum: RoleType })
//   name: string;

//   @Prop({ default: '' })
//   description: string;
// }

// export const RoleSchema = SchemaFactory.createForClass(Role);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

export enum RoleType {
  ADMIN = 'admin',
  USER = 'user',
  WORKER = 'worker',
}

@Schema({
  timestamps: true,
  collection: 'roles',
})
export class Role {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  name: string;

  @Prop({
    default: '',
    trim: true,
  })
  description: string;

  @Prop({
    type: [String],
    default: [],
  })
  permissions: string[];

  @Prop({
    default: true,
  })
  is_active: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({
  timestamps: true,
  collection: 'tags',
})
export class Tag {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({
    default: '',
    trim: true,
  })
  description: string;

  @Prop({
    default: '#34495e',
    trim: true,
  })
  color: string;

  @Prop({
    default: true,
  })
  is_active: boolean;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

export enum DepartmentType {
  PWD = 'pwd',
  WATER = 'water',
  ELECTRICITY = 'electricity',
  SANITATION = 'sanitation',
  TRAFFIC = 'traffic',
  TELECOM = 'telecom',
  OTHER = 'other',
}

@Schema({
  timestamps: true,
  collection: 'categories',
})
export class Category {
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
    required: true,
    trim: true,
  })
  department: string;

  @Prop({
    default: '',
  })
  icon: string;

  @Prop({
    default: '#000000',
  })
  color: string;

  @Prop({
    min: 1,
    max: 5,
    default: 3,
  })
  priority_weight: number;

  @Prop({
    default: 72, // hours
  })
  sla_hours: number;

  @Prop({
    default: true,
  })
  is_active: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
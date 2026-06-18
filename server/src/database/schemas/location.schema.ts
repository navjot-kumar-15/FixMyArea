import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum LocationType {
  COUNTRY = 'country',
  STATE = 'state',
  CITY = 'city',
  AREA = 'area',
}

@Schema({
  timestamps: true,
  collection: 'locations',
})
export class Location extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    enum: LocationType,
    required: true,
  })
  type: LocationType;

  @Prop({
    type: Types.ObjectId,
    ref: 'Location',
    default: null,
  })
  parent_id: Types.ObjectId;

  @Prop({
    default: true,
  })
  is_active: boolean;

  @Prop({
    default: true,
  })
  is_serviceable: boolean;

  @Prop()
  code: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

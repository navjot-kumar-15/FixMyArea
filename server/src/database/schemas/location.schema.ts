import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum LocationType {
  COUNTRY = 'country',
  STATE = 'state',
  CITY = 'city',
  AREA = 'area',
}

@Schema({ _id: false })
export class GeoLocation {
  @Prop({
    type: String,
    enum: ['Point'],
    default: 'Point',
  })
  type: string;

  @Prop({
    type: [Number],
    required: true,
    validate: {
      validator: (value: number[]) => value.length === 2,
      message: 'Coordinates must contain [longitude, latitude]',
    },
  })
  coordinates: number[];
}

export const GeoLocationSchema =
  SchemaFactory.createForClass(GeoLocation);

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
    type: GeoLocationSchema,
  })
  geo_location: GeoLocation;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({
    default: true,
  })
  is_active: boolean;

  @Prop({
    default: true,
  })
  is_serviceable: boolean;
}

export const LocationSchema =
  SchemaFactory.createForClass(Location);

LocationSchema.index({
  geo_location: '2dsphere',
});

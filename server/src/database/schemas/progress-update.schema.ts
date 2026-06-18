import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProgressUpdateDocument = ProgressUpdate & Document;

@Schema({ _id: false })
export class ProgressImage {
  @Prop({ required: true })
  url: string;

  @Prop()
  public_id: string;
}

export const ProgressImageSchema = SchemaFactory.createForClass(ProgressImage);

@Schema({
  timestamps: true,
  collection: 'progress_updates',
})
export class ProgressUpdate {
  @Prop({
    type: Types.ObjectId,
    ref: 'Report',
    required: true,
    index: true,
  })
  report_id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  worker_id: Types.ObjectId;

  @Prop({
    trim: true,
    maxlength: 1000,
    required: true,
  })
  note: string;

  @Prop({
    min: 0,
    max: 100,
    required: true,
  })
  progress_percentage: number;

  @Prop({
    type: [ProgressImageSchema],
    default: [],
  })
  images: ProgressImage[];

  @Prop({
    default: false,
  })
  is_final_update: boolean;

  @Prop({
    default: false,
  })
  is_verified: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  verified_by: Types.ObjectId;

  @Prop()
  verified_at: Date;

  @Prop({
    default: false,
  })
  is_deleted: boolean;

  @Prop()
  deleted_at: Date;
}

export const ProgressUpdateSchema =
  SchemaFactory.createForClass(ProgressUpdate);

/* ---------------- INDEXES ---------------- */

ProgressUpdateSchema.index({
  report_id: 1,
  createdAt: -1,
});

ProgressUpdateSchema.index({
  worker_id: 1,
  createdAt: -1,
});

ProgressUpdateSchema.index({
  is_deleted: 1,
});

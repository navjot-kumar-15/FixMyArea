import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AssignmentDocument = Assignment & Document;

export enum AssignmentStatus {
  ASSIGNED = 'assigned',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REASSIGNED = 'reassigned',
}

@Schema({
  timestamps: true,
  collection: 'assignments',
})
export class Assignment {
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
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  assigned_by: Types.ObjectId;

  @Prop({
    enum: AssignmentStatus,
    default: AssignmentStatus.ASSIGNED,
  })
  status: AssignmentStatus;

  @Prop({
    trim: true,
    maxlength: 1000,
  })
  note: string;

  @Prop()
  assigned_at: Date;

  @Prop()
  accepted_at: Date;

  @Prop()
  rejected_at: Date;

  @Prop()
  completed_at: Date;

  @Prop({
    trim: true,
    maxlength: 500,
  })
  rejection_reason: string;

  @Prop({
    default: false,
  })
  is_active: boolean;

  @Prop({
    default: false,
  })
  is_deleted: boolean;

  @Prop()
  deleted_at: Date;
}

export const AssignmentSchema =
  SchemaFactory.createForClass(Assignment);

/* Indexes */

AssignmentSchema.index({
  status: 1,
});

AssignmentSchema.index({
  worker_id: 1,
  status: 1,
});

// AssignmentSchema.index({
//   report_id: 1,
//   worker_id: 1,
// });
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// export enum ReportStatus {
//   Pending = 'Pending',
//   UnderReview = 'Under Review',
//   Assigned = 'Assigned',
//   InProgress = 'In Progress',
//   Resolved = 'Resolved',
//   Rejected = 'Rejected',
// }

// export enum ReportPriority {
//   Low = 'Low',
//   Medium = 'Medium',
//   High = 'High',
//   Critical = 'Critical',
// }

// export enum VisibilityType {
//   Public = 'Public',
//   Private = 'Private',
// }

// @Schema({ _id: false })
// export class ReportImage {
//   @Prop()
//   url: string;

//   @Prop()
//   publicId: string;
// }
// export const ReportImageSchema = SchemaFactory.createForClass(ReportImage);

// @Schema({ _id: false })
// export class ReportLocation {
//   @Prop({ type: String, enum: ['Point'], default: 'Point' })
//   type: string;

//   @Prop({ type: [Number], required: true })
//   coordinates: number[]; // [longitude, latitude]
// }
// export const ReportLocationSchema =
//   SchemaFactory.createForClass(ReportLocation);

// @Schema({ _id: false })
// export class AiAnalysis {
//   @Prop()
//   detectedCategory: string;

//   @Prop()
//   confidence: number;

//   @Prop()
//   suggestedPriority: string;

//   @Prop()
//   toxicityScore: number;
// }
// export const AiAnalysisSchema = SchemaFactory.createForClass(AiAnalysis);

// @Schema({ _id: false })
// export class Moderation {
//   @Prop({ default: false })
//   isFlagged: boolean;

//   @Prop()
//   flaggedReason: string;
// }
// export const ModerationSchema = SchemaFactory.createForClass(Moderation);

// @Schema({ timestamps: true })
// export class Report extends Document {
//   @Prop({ required: true, trim: true, maxlength: 150 })
//   title: string;

//   @Prop({ required: true, maxlength: 2000 })
//   description: string;

//   @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
//   category: Types.ObjectId;

//   @Prop({ type: [ReportImageSchema], default: [] })
//   images: ReportImage[];

//   @Prop({ type: ReportLocationSchema })
//   location: ReportLocation;

//   @Prop()
//   address: string;

//   @Prop()
//   city: string;

//   @Prop()
//   state: string;

//   @Prop()
//   country: string;

//   @Prop()
//   pincode: string;

//   @Prop({ enum: ReportStatus, default: ReportStatus.Pending })
//   status: string;

//   @Prop({ enum: ReportPriority, default: ReportPriority.Medium })
//   priority: string;

//   @Prop({ default: 0 })
//   severityScore: number;

//   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//   createdBy: Types.ObjectId;

//   @Prop({ type: Types.ObjectId, ref: 'User' })
//   assignedWorker: Types.ObjectId;

//   @Prop({ type: Types.ObjectId, ref: 'Report', default: null })
//   duplicateOf: Types.ObjectId;

//   @Prop({ default: 0 })
//   upvotesCount: number;

//   @Prop({ default: 0 })
//   downvotesCount: number;

//   @Prop({ default: 0 })
//   commentsCount: number;

//   @Prop({ default: 0 })
//   viewsCount: number;

//   @Prop({ default: 0 })
//   supportersCount: number;

//   @Prop({ default: false })
//   isVerified: boolean;

//   @Prop({ default: false })
//   isResolved: boolean;

//   @Prop()
//   resolvedAt: Date;

//   @Prop({ type: Types.ObjectId, ref: 'User' })
//   resolvedBy: Types.ObjectId;

//   @Prop({ type: AiAnalysisSchema })
//   aiAnalysis: AiAnalysis;

//   @Prop({ type: [String], default: [] })
//   tags: string[];

//   @Prop({ type: ModerationSchema, default: () => ({ isFlagged: false }) })
//   moderation: Moderation;

//   @Prop({ enum: VisibilityType, default: VisibilityType.Public })
//   visibility: string;

//   @Prop({ default: false })
//   isDeleted: boolean;

//   @Prop()
//   deletedAt: Date;
// }

// export const ReportSchema = SchemaFactory.createForClass(Report);

// ReportSchema.index({ location: '2dsphere' });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ReportStatus {
  Pending = 'Pending',
  UnderReview = 'Under Review',
  Assigned = 'Assigned',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
  Rejected = 'Rejected',
}

export enum ReportPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
}

export enum VisibilityType {
  Public = 'Public',
  Private = 'Private',
}

/* -------------------------------------------------------------------------- */
/*                                SUB DOCUMENTS                               */
/* -------------------------------------------------------------------------- */

@Schema({ _id: false })
export class ReportImage {
  @Prop({ required: true })
  url: string;

  @Prop()
  public_id: string;
}

export const ReportImageSchema = SchemaFactory.createForClass(ReportImage);

@Schema({ _id: false })
export class ReportLocation {
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

export const ReportLocationSchema =
  SchemaFactory.createForClass(ReportLocation);

@Schema({ _id: false })
export class AiAnalysis {
  @Prop()
  detected_category: string;

  @Prop()
  confidence: number;

  @Prop({
    enum: ReportPriority,
  })
  suggested_priority: ReportPriority;

  @Prop({ default: 0 })
  toxicity_score: number;
}

export const AiAnalysisSchema = SchemaFactory.createForClass(AiAnalysis);

@Schema({ _id: false })
export class Moderation {
  @Prop({ default: false })
  is_flagged: boolean;

  @Prop()
  flagged_reason: string;
}

export const ModerationSchema = SchemaFactory.createForClass(Moderation);

@Schema({ _id: false })
export class StatusHistory {
  @Prop({
    enum: ReportStatus,
    required: true,
  })
  status: ReportStatus;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  updated_by: Types.ObjectId;

  @Prop()
  note: string;

  @Prop({
    default: Date.now,
  })
  changed_at: Date;
}

export const StatusHistorySchema = SchemaFactory.createForClass(StatusHistory);

/* -------------------------------------------------------------------------- */
/*                                   REPORT                                   */
/* -------------------------------------------------------------------------- */

@Schema({
  timestamps: true,
  collection: 'reports',
})
export class Report extends Document {
  /* ---------------------------- BASIC DETAILS ---------------------------- */

  @Prop({
    required: true,
    trim: true,
    maxlength: 150,
  })
  title: string;

  @Prop({
    required: true,
    maxlength: 2000,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Types.ObjectId;

  /* ------------------------------ IMAGES ------------------------------ */

  @Prop({
    type: [ReportImageSchema],
    default: [],
  })
  images: ReportImage[];

  @Prop({
    type: [ReportImageSchema],
    default: [],
  })
  resolution_images: ReportImage[];

  /* ----------------------------- LOCATION ----------------------------- */

  @Prop({
    type: ReportLocationSchema,
    required: true,
  })
  location: ReportLocation;

  @Prop({
    type: Types.ObjectId,
    ref: 'Location',
    default: null,
  })
  location_id: Types.ObjectId;

  @Prop()
  address: string;

  @Prop()
  landmark: string;

  @Prop()
  ward_number: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  pincode: string;

  /* ----------------------------- WORKFLOW ----------------------------- */

  @Prop({
    enum: ReportStatus,
    default: ReportStatus.Pending,
  })
  status: ReportStatus;

  @Prop({
    enum: ReportPriority,
    default: ReportPriority.Medium,
  })
  priority: ReportPriority;

  @Prop({
    min: 0,
    max: 100,
    default: 50,
  })
  severity_score: number;

  @Prop({
    type: [StatusHistorySchema],
    default: [],
  })
  status_history: StatusHistory[];

  /* ------------------------------ USERS ------------------------------ */

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  created_by: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  assigned_worker: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  verified_by: Types.ObjectId;

  @Prop()
  verified_at: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  resolved_by: Types.ObjectId;

  @Prop()
  resolved_at: Date;

  /* ------------------------- DUPLICATE REPORTS ------------------------- */

  @Prop({
    default: false,
  })
  is_duplicate: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'Report',
    default: null,
  })
  duplicate_of: Types.ObjectId;

  /* ------------------------------ COUNTERS ------------------------------ */

  @Prop({ default: 0 })
  upvotes_count: number;

  @Prop({ default: 0 })
  downvotes_count: number;

  @Prop({ default: 0 })
  comments_count: number;

  @Prop({ default: 0 })
  views_count: number;

  /* ---------------------------- VERIFICATION ---------------------------- */

  @Prop({
    default: false,
  })
  is_verified: boolean;

  /* ---------------------------- AI SECTION ---------------------------- */

  @Prop({
    type: AiAnalysisSchema,
  })
  ai_analysis: AiAnalysis;

  @Prop({
    type: [String],
    default: [],
  })
  tags: string[];

  /* --------------------------- MODERATION --------------------------- */

  @Prop({
    type: ModerationSchema,
    default: () => ({
      is_flagged: false,
    }),
  })
  moderation: Moderation;

  /* ------------------------------ SLA ------------------------------ */

  @Prop()
  sla_deadline: Date;

  @Prop({
    default: 0,
  })
  escalation_level: number;

  /* ----------------------------- VISIBILITY ----------------------------- */

  @Prop({
    enum: VisibilityType,
    default: VisibilityType.Public,
  })
  visibility: VisibilityType;

  /* ---------------------------- SOFT DELETE ---------------------------- */

  @Prop({
    default: false,
  })
  is_deleted: boolean;

  @Prop()
  deleted_at: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  deleted_by: Types.ObjectId;
}

export const ReportSchema = SchemaFactory.createForClass(Report);

/* -------------------------------------------------------------------------- */
/*                                   INDEXES                                  */
/* -------------------------------------------------------------------------- */

ReportSchema.index({
  location: '2dsphere',
});

ReportSchema.index({
  location_id: 1,
});

ReportSchema.index({
  category: 1,
  status: 1,
});

ReportSchema.index({
  created_by: 1,
  createdAt: -1,
});

ReportSchema.index({
  assigned_worker: 1,
  status: 1,
});

ReportSchema.index({
  priority: 1,
  status: 1,
});

ReportSchema.index({
  is_deleted: 1,
});

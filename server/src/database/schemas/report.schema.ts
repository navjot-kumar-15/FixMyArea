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

@Schema({ _id: false })
export class ReportImage {
  @Prop()
  url: string;

  @Prop()
  publicId: string;
}
export const ReportImageSchema = SchemaFactory.createForClass(ReportImage);

@Schema({ _id: false })
export class ReportLocation {
  @Prop({ type: String, enum: ['Point'], default: 'Point' })
  type: string;

  @Prop({ type: [Number], required: true })
  coordinates: number[]; // [longitude, latitude]
}
export const ReportLocationSchema = SchemaFactory.createForClass(ReportLocation);

@Schema({ _id: false })
export class AiAnalysis {
  @Prop()
  detectedCategory: string;

  @Prop()
  confidence: number;

  @Prop()
  suggestedPriority: string;

  @Prop()
  toxicityScore: number;
}
export const AiAnalysisSchema = SchemaFactory.createForClass(AiAnalysis);

@Schema({ _id: false })
export class Moderation {
  @Prop({ default: false })
  isFlagged: boolean;

  @Prop()
  flaggedReason: string;
}
export const ModerationSchema = SchemaFactory.createForClass(Moderation);

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop({ required: true, trim: true, maxlength: 150 })
  title: string;

  @Prop({ required: true, maxlength: 2000 })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ type: [ReportImageSchema], default: [] })
  images: ReportImage[];

  @Prop({ type: ReportLocationSchema })
  location: ReportLocation;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  pincode: string;

  @Prop({ enum: ReportStatus, default: ReportStatus.Pending })
  status: string;

  @Prop({ enum: ReportPriority, default: ReportPriority.Medium })
  priority: string;

  @Prop({ default: 0 })
  severityScore: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedWorker: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Report', default: null })
  duplicateOf: Types.ObjectId;

  @Prop({ default: 0 })
  upvotesCount: number;

  @Prop({ default: 0 })
  downvotesCount: number;

  @Prop({ default: 0 })
  commentsCount: number;

  @Prop({ default: 0 })
  viewsCount: number;

  @Prop({ default: 0 })
  supportersCount: number;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isResolved: boolean;

  @Prop()
  resolvedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  resolvedBy: Types.ObjectId;

  @Prop({ type: AiAnalysisSchema })
  aiAnalysis: AiAnalysis;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: ModerationSchema, default: () => ({ isFlagged: false }) })
  moderation: Moderation;

  @Prop({ enum: VisibilityType, default: VisibilityType.Public })
  visibility: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const ReportSchema = SchemaFactory.createForClass(Report);

ReportSchema.index({ location: '2dsphere' });

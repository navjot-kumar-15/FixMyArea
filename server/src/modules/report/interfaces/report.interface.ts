import { Types } from 'mongoose';
import {
  ReportStatus,
  ReportPriority,
  VisibilityType,
} from '../../../database/schemas/report.schema';

export interface IReportImage {
  url: string;
  public_id: string;
}

export interface IReportLocation {
  type: string;
  coordinates: number[]; // [longitude, latitude]
}

export interface IAiAnalysis {
  detected_category: string;
  confidence: number;
  suggested_priority: string;
  toxicity_score: number;
}

export interface IModeration {
  is_flagged: boolean;
  flagged_reason: string;
}

export interface IReport {
  id: string;
  title: string;
  description: string;
  category?: unknown;
  images: IReportImage[];
  location: IReportLocation;
  location_id?: string | null;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  status: ReportStatus | string;
  priority: ReportPriority | string;
  severity_score: number;
  created_by: string;
  assigned_worker?: string;
  duplicate_of?: string;
  upvotes_count: number;
  downvotes_count: number;
  comments_count: number;
  views_count: number;
  supporters_count: number;
  is_verified: boolean;
  is_resolved: boolean;
  resolved_at?: Date;
  resolved_by?: string;
  ai_analysis?: IAiAnalysis;
  tags: string[];
  moderation: IModeration;
  visibility: VisibilityType | string;
  is_deleted: boolean;
  deleted_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReportFilterQuery {
  is_deleted?: { $ne: boolean };
  $or?: Array<{
    title?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
  }>;
  category?: Types.ObjectId;
  status?: ReportStatus;
  location_id?: Types.ObjectId;
}

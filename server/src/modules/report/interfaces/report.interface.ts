import {
  ReportStatus,
  ReportPriority,
  VisibilityType,
} from '../../../database/schemas/report.schema';

export interface IReportImage {
  url: string;
  publicId: string;
}

export interface IReportLocation {
  type: string;
  coordinates: number[]; // [longitude, latitude]
}

export interface IAiAnalysis {
  detectedCategory: string;
  confidence: number;
  suggestedPriority: string;
  toxicityScore: number;
}

export interface IModeration {
  isFlagged: boolean;
  flaggedReason: string;
}

export interface IReport {
  id: string;
  title: string;
  description: string;
  category: string | any;
  images: IReportImage[];
  location: IReportLocation;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  status: ReportStatus | string;
  priority: ReportPriority | string;
  severityScore: number;
  createdBy: string;
  assignedWorker?: string;
  duplicateOf?: string;
  upvotesCount: number;
  downvotesCount: number;
  commentsCount: number;
  viewsCount: number;
  supportersCount: number;
  isVerified: boolean;
  isResolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
  aiAnalysis?: IAiAnalysis;
  tags: string[];
  moderation: IModeration;
  visibility: VisibilityType | string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

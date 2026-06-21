import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ReportStatus,
  ReportPriority,
  VisibilityType,
} from '../../../database/schemas/report.schema';

export class ReportImageResponseDto {
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL of the image',
  })
  url: string;

  @ApiProperty({
    example: 'cloudinary_public_id_123',
    description: 'Public ID of the image for cloud storage',
  })
  public_id: string;
}

export class ReportLocationResponseDto {
  @ApiProperty({
    example: 'Point',
    enum: ['Point'],
    description: 'Type of location',
  })
  type: string;

  @ApiProperty({
    example: [77.5946, 12.9716],
    type: [Number],
    description: 'Coordinates [longitude, latitude]',
  })
  coordinates: number[];
}

export class AiAnalysisResponseDto {
  @ApiProperty({ example: 'Pothole', description: 'Detected category' })
  detected_category: string;

  @ApiProperty({ example: 0.95, description: 'Confidence score' })
  confidence: number;

  @ApiProperty({
    example: 'Medium',
    enum: ReportPriority,
    description: 'Suggested priority',
  })
  suggested_priority: string;

  @ApiProperty({ example: 0.05, description: 'Toxicity score' })
  toxicity_score: number;
}

export class ModerationResponseDto {
  @ApiProperty({ example: false, description: 'Whether the report is flagged' })
  is_flagged: boolean;

  @ApiPropertyOptional({
    example: 'Inappropriate language',
    description: 'Reason for flagging',
  })
  flagged_reason?: string;
}

export class ReportResponseDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ea',
    description: 'Report ID',
  })
  id: string;

  @ApiProperty({
    example: 'Pothole on Main St',
    description: 'Title of the report',
  })
  title: string;

  @ApiProperty({
    example: 'There is a huge pothole causing traffic slowdown.',
    description: 'Detailed description of the report',
  })
  description: string;

  @ApiProperty({
    example: '60d21b4667d0d8992e610c85',
    description: 'MongoDB ID of the category, or populated category object',
  })
  category: any;

  @ApiProperty({
    type: [ReportImageResponseDto],
    description: 'Array of images',
  })
  images: ReportImageResponseDto[];

  @ApiProperty({
    type: ReportLocationResponseDto,
    description: 'Geospatial location of the report',
  })
  location: ReportLocationResponseDto;

  @ApiPropertyOptional({
    example: '60d21b4667d0d8992e610c85',
    description: 'MongoDB ID of the associated Location',
  })
  location_id?: string | null;

  @ApiPropertyOptional({
    example: '123 Main St, Bengaluru',
    description: 'Formatted address',
  })
  address?: string;

  @ApiPropertyOptional({ example: 'Bengaluru', description: 'City' })
  city?: string;

  @ApiPropertyOptional({ example: 'Karnataka', description: 'State' })
  state?: string;

  @ApiPropertyOptional({ example: 'India', description: 'Country' })
  country?: string;

  @ApiPropertyOptional({ example: '560001', description: 'Pincode/Zipcode' })
  pincode?: string;

  @ApiProperty({
    example: 'Pending',
    enum: ReportStatus,
    description: 'Status of the report',
  })
  status: string;

  @ApiProperty({
    example: 'Medium',
    enum: ReportPriority,
    description: 'Priority of the report',
  })
  priority: string;

  @ApiProperty({ example: 50, description: 'Severity score (0-100)' })
  severity_score: number;

  @ApiProperty({
    example: '60d0fe4f5311236168a109eb',
    description: 'MongoDB ID of the creator',
  })
  created_by: string;

  @ApiPropertyOptional({
    example: '60d0fe4f5311236168a109ec',
    description: 'MongoDB ID of the assigned worker',
  })
  assigned_worker?: string;

  @ApiPropertyOptional({
    example: '60d0fe4f5311236168a109ed',
    description: 'MongoDB ID of the duplicate report',
  })
  duplicate_of?: string;

  @ApiProperty({ example: 0, description: 'Upvotes count' })
  upvotes_count: number;

  @ApiProperty({ example: 0, description: 'Downvotes count' })
  downvotes_count: number;

  @ApiProperty({ example: 0, description: 'Comments count' })
  comments_count: number;

  @ApiProperty({ example: 0, description: 'Views count' })
  views_count: number;

  @ApiProperty({ example: 0, description: 'Supporters count' })
  supporters_count: number;

  @ApiProperty({
    example: false,
    description: 'Whether the report is verified',
  })
  is_verified: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the report is resolved',
  })
  is_resolved: boolean;

  @ApiPropertyOptional({
    example: '2026-06-12T11:30:00.000Z',
    description: 'Resolved timestamp',
  })
  resolved_at?: Date;

  @ApiPropertyOptional({
    example: '60d0fe4f5311236168a109ee',
    description: 'MongoDB ID of the resolver',
  })
  resolved_by?: string;

  @ApiPropertyOptional({
    type: AiAnalysisResponseDto,
    description: 'AI Analysis results',
  })
  ai_analysis?: AiAnalysisResponseDto;

  @ApiProperty({ type: [String], description: 'Tags for the report' })
  tags: string[];

  @ApiProperty({
    type: ModerationResponseDto,
    description: 'Moderation status',
  })
  moderation: ModerationResponseDto;

  @ApiProperty({
    example: 'Public',
    enum: VisibilityType,
    description: 'Visibility of the report',
  })
  visibility: string;

  @ApiProperty({ example: false, description: 'Whether the report is deleted' })
  is_deleted: boolean;

  @ApiPropertyOptional({
    example: '2026-06-12T11:30:00.000Z',
    description: 'Deleted timestamp',
  })
  deleted_at?: Date;

  @ApiPropertyOptional({
    example: '2026-06-12T10:00:00.000Z',
    description: 'Created timestamp',
  })
  createdAt?: Date;

  @ApiPropertyOptional({
    example: '2026-06-12T10:00:00.000Z',
    description: 'Updated timestamp',
  })
  updatedAt?: Date;
}

export class PaginatedReportResponseDto {
  @ApiProperty({ type: [ReportResponseDto] })
  data: ReportResponseDto[];

  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}

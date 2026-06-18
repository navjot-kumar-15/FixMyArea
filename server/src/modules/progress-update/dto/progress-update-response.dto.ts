import { ApiProperty } from '@nestjs/swagger';

export class ProgressImageResponseDto {
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL of the progress image',
  })
  url: string;

  @ApiProperty({
    example: 'cloudinary_public_id_123',
    required: false,
    description: 'Public ID of cloud storage',
  })
  public_id?: string;
}

export class ProgressUpdateResponseDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ea',
    description: 'Progress update ID',
  })
  id: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109eb',
    description: 'Associated report ID',
  })
  report_id: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109ec',
    description: 'Worker user ID',
  })
  worker_id: string;

  @ApiProperty({
    example: 'Completed excavation and initial layering.',
    description: 'Note describing progress',
  })
  note: string;

  @ApiProperty({ example: 75, description: 'Progress percentage (0-100)' })
  progress_percentage: number;

  @ApiProperty({
    type: [ProgressImageResponseDto],
    required: false,
    description: 'Progress images',
  })
  images?: ProgressImageResponseDto[];

  @ApiProperty({
    example: false,
    description: 'Indicates if this is the final progress update',
  })
  is_final_update: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates if the update has been verified by an admin',
  })
  is_verified: boolean;

  @ApiProperty({
    example: '60d0fe4f5311236168a109ed',
    required: false,
    description: 'Admin user ID who verified',
  })
  verified_by?: string;

  @ApiProperty({
    example: '2026-06-12T11:30:00.000Z',
    required: false,
    description: 'Verification timestamp',
  })
  verified_at?: Date;

  @ApiProperty({ example: false, description: 'Indicates if soft deleted' })
  is_deleted: boolean;

  @ApiProperty({
    example: '2026-06-12T10:00:00.000Z',
    required: false,
    description: 'Created timestamp',
  })
  createdAt?: Date;

  @ApiProperty({
    example: '2026-06-12T10:00:00.000Z',
    required: false,
    description: 'Updated timestamp',
  })
  updatedAt?: Date;
}

export class PaginatedProgressUpdateResponseDto {
  @ApiProperty({ type: [ProgressUpdateResponseDto] })
  data: ProgressUpdateResponseDto[];

  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}

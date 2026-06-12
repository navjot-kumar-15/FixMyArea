import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'Comment ID' })
  id: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'Associated report ID' })
  report_id: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cc', description: 'Author user ID' })
  user_id: string;

  @ApiProperty({ example: 'This is a comment about the pothole.', description: 'Comment message' })
  message: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cd', required: false, description: 'Parent comment ID if threaded' })
  parent_comment_id?: string;

  @ApiProperty({ example: false, description: 'Indicates if the comment was edited' })
  is_edited: boolean;

  @ApiProperty({ example: '2026-06-12T10:00:00.000Z', required: false, description: 'Time when edited' })
  edited_at?: Date;

  @ApiProperty({ example: false, description: 'Indicates if the comment was soft deleted' })
  is_deleted: boolean;

  @ApiProperty({ example: '2026-06-12T10:00:00.000Z', required: false, description: 'Created timestamp' })
  createdAt?: Date;

  @ApiProperty({ example: '2026-06-12T10:00:00.000Z', required: false, description: 'Updated timestamp' })
  updatedAt?: Date;
}

export class PaginatedCommentResponseDto {
  @ApiProperty({ type: [CommentResponseDto] })
  data: CommentResponseDto[];

  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}

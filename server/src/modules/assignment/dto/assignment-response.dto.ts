import { ApiProperty } from '@nestjs/swagger';
import { AssignmentStatus } from '../interfaces/assignment.interface';

export class AssignmentResponseDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109da', description: 'Assignment ID' })
  id: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109db', description: 'Associated report ID' })
  report_id: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109dc', description: 'Assigned worker user ID' })
  worker_id: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109dd', description: 'ID of the admin who assigned the report' })
  assigned_by: string;

  @ApiProperty({ enum: AssignmentStatus, example: AssignmentStatus.ASSIGNED, description: 'Assignment status' })
  status: AssignmentStatus;

  @ApiProperty({ example: 'Please inspect the pothole and fix it.', required: false, description: 'Optional instruction or note' })
  note?: string;

  @ApiProperty({ example: '2026-06-12T10:00:00.000Z', required: false, description: 'Time assigned' })
  assigned_at?: Date;

  @ApiProperty({ example: '2026-06-12T10:15:00.000Z', required: false, description: 'Time accepted by worker' })
  accepted_at?: Date;

  @ApiProperty({ example: '2026-06-12T10:30:00.000Z', required: false, description: 'Time rejected by worker' })
  rejected_at?: Date;

  @ApiProperty({ example: '2026-06-12T11:00:00.000Z', required: false, description: 'Time completed' })
  completed_at?: Date;

  @ApiProperty({ example: 'Not my region of service.', required: false, description: 'Reason for rejection if rejected' })
  rejection_reason?: string;

  @ApiProperty({ example: true, description: 'Indicates if the assignment is currently active' })
  is_active: boolean;

  @ApiProperty({ example: false, description: 'Indicates if the assignment is soft deleted' })
  is_deleted: boolean;

  @ApiProperty({ example: '2026-06-12T10:00:00.000Z', required: false, description: 'Created timestamp' })
  createdAt?: Date;

  @ApiProperty({ example: '2026-06-12T10:00:00.000Z', required: false, description: 'Updated timestamp' })
  updatedAt?: Date;
}

export class PaginatedAssignmentResponseDto {
  @ApiProperty({ type: [AssignmentResponseDto] })
  data: AssignmentResponseDto[];

  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}

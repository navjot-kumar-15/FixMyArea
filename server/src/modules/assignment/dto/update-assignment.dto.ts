import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { AssignmentStatus } from '../interfaces/assignment.interface';

export class UpdateAssignmentDto {
  @ApiPropertyOptional({
    enum: AssignmentStatus,
    description: 'Status of assignment',
  })
  @IsOptional()
  @IsEnum(AssignmentStatus)
  status?: AssignmentStatus;

  @ApiPropertyOptional({ description: 'Optional instruction or note' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;

  @ApiPropertyOptional({ description: 'Reason if assignment is rejected' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  rejection_reason?: string;

  @ApiPropertyOptional({ description: 'Is the assignment active?' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

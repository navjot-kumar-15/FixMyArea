import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { AssignmentStatus } from '../interfaces/assignment.interface';

export class FilterAssignmentDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by worker_id' })
  @IsOptional()
  @IsMongoId()
  worker_id?: string;

  @ApiPropertyOptional({ description: 'Filter by report_id' })
  @IsOptional()
  @IsMongoId()
  report_id?: string;

  @ApiPropertyOptional({
    enum: AssignmentStatus,
    description: 'Filter by status',
  })
  @IsOptional()
  @IsEnum(AssignmentStatus)
  status?: AssignmentStatus;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsMongoId } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FilterReportDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Search reports by title or description' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by category ID' })
  @IsOptional()
  @IsMongoId()
  category?: string;

  @ApiPropertyOptional({ description: 'Filter by report status' })
  @IsOptional()
  @IsString()
  status?: string;

  // Add future report-specific filters here
}

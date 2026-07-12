import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsMongoId } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FilterReportDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search reports by title or description',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by category ID',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  category?: string;

  @ApiPropertyOptional({
    description: 'Filter by report status',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Filter by location ID',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  location_id?: string;

  // Add future report-specific filters here
}

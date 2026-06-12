import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FilterProgressUpdateDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by worker_id' })
  @IsOptional()
  @IsMongoId()
  worker_id?: string;

  @ApiPropertyOptional({ description: 'Filter by report_id' })
  @IsOptional()
  @IsMongoId()
  report_id?: string;

  @ApiPropertyOptional({ description: 'Filter by verification status' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  is_verified?: boolean;
}

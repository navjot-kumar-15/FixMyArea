import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsMongoId } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FilterCommentDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter comments by report_id' })
  @IsOptional()
  @IsMongoId()
  report_id?: string;

  @ApiPropertyOptional({ description: 'Filter comments by user_id' })
  @IsOptional()
  @IsMongoId()
  user_id?: string;
}

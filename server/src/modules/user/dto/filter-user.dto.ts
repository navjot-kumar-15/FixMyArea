import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FilterUserDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Search users by name or email' })
  @IsOptional()
  @IsString()
  search?: string;

  // Add future user-specific filters here (e.g., role_id, is_banned)
}

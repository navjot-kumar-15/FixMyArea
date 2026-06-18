import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsHexColor,
  IsBoolean,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'Name of the category',
    example: 'Pothole',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name?: string;

  @ApiPropertyOptional({
    description: 'Detailed description of what issues this category covers',
    example: 'Road damage and potholes needing repair',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiPropertyOptional({
    description: 'Municipal department in charge of this category',
    example: 'pwd',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  department?: string;

  @ApiPropertyOptional({
    description: 'Icon identifier for frontend rendering',
    example: 'road',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  icon?: string;

  @ApiPropertyOptional({
    description: 'Theme color code for frontend rendering',
    example: '#e74c3c',
  })
  @IsOptional()
  @IsHexColor()
  color?: string;

  @ApiPropertyOptional({
    description: 'Priority weight (1-5) used in severity calculations',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  priority_weight?: number;

  @ApiPropertyOptional({
    description: 'SLA response hours for resolving issues of this category',
    example: 48,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  sla_hours?: number;

  @ApiPropertyOptional({
    description: 'Status indicating if this category is active',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

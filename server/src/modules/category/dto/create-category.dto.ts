import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max, IsHexColor, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Pothole',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiPropertyOptional({
    description: 'Detailed description of what issues this category covers',
    example: 'Road damage and potholes needing repair',
    default: '',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiProperty({
    description: 'Municipal department in charge of this category',
    example: 'pwd',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  department: string;

  @ApiPropertyOptional({
    description: 'Icon identifier for frontend rendering',
    example: 'road',
    default: '',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  icon?: string;

  @ApiPropertyOptional({
    description: 'Theme color code for frontend rendering',
    example: '#e74c3c',
    default: '#000000',
  })
  @IsOptional()
  @IsHexColor()
  color?: string;

  @ApiPropertyOptional({
    description: 'Priority weight (1-5) used in severity calculations',
    example: 4,
    minimum: 1,
    maximum: 5,
    default: 3,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  priority_weight?: number;

  @ApiPropertyOptional({
    description: 'SLA response hours for resolving issues of this category',
    example: 48,
    default: 72,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  sla_hours?: number;

  @ApiPropertyOptional({
    description: 'Status indicating if this category is active',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

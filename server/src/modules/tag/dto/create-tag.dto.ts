import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsHexColor,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateTagDto {
  @ApiProperty({
    description: 'Name of the tag',
    example: 'Urgent',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the tag',
    example: 'Requires immediate attention due to safety or high impact',
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiPropertyOptional({
    description: 'Theme color code for frontend rendering',
    example: '#e74c3c',
    default: '#34495e',
    required: false,
  })
  @IsOptional()
  @IsHexColor()
  color?: string;

  @ApiPropertyOptional({
    description: 'Status indicating if this tag is active',
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

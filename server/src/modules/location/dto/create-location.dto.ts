import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsMongoId,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { LocationType } from '../../../database/schemas/location.schema';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Name of the location',
    example: 'Karnataka',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({
    description: 'Type of the location',
    enum: LocationType,
    example: LocationType.STATE,
  })
  @IsNotEmpty()
  @IsEnum(LocationType)
  type: LocationType;

  @ApiPropertyOptional({
    description: 'MongoDB ObjectId of the parent location',
    example: '60d21b4667d0d8992e610c85',
    default: null,
  })
  @IsOptional()
  @IsMongoId()
  parent_id?: string;

  @ApiPropertyOptional({
    description: 'Status indicating if this location is active',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({
    description: 'Status indicating if this location is serviceable',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_serviceable?: boolean;

  @ApiPropertyOptional({
    description: 'Optional short code for the location',
    example: 'KA',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  code?: string;
}

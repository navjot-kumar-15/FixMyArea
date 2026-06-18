import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsMongoId,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { LocationType } from '../../../database/schemas/location.schema';

export class GeoLocationDto {
  @ApiProperty({
    description: 'Type of location',
    default: 'Point',
    enum: ['Point'],
  })
  @IsString()
  @IsOptional()
  type?: string = 'Point';

  @ApiProperty({
    description: 'Coordinates [longitude, latitude]',
    type: [Number],
    example: [77.5946, 12.9716],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  coordinates: number[];
}

export class CreateLocationDto {
  @ApiProperty({
    description: 'Name of the location',
    example: 'Karnataka',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : '',
  )
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
    description: 'Geospatial location coordinates',
    type: GeoLocationDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => GeoLocationDto)
  geo_location?: GeoLocationDto;

  @ApiPropertyOptional({
    description: 'Latitude coordinates',
    example: 12.9716,
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinates',
    example: 77.5946,
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}

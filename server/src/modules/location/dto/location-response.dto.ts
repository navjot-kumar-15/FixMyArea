import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LocationType } from '../../../database/schemas/location.schema';

export class GeoLocationResponseDto {
  @ApiProperty({ example: 'Point' })
  type: string;

  @ApiProperty({ example: [77.5946, 12.9716], type: [Number] })
  coordinates: number[];
}

export class LocationResponseDto {
  @ApiProperty({
    example: '60d21b4667d0d8992e610c85',
    description: 'Location ID',
  })
  id: string;

  @ApiProperty({ example: 'Karnataka', description: 'Name of the location' })
  name: string;

  @ApiProperty({
    example: LocationType.STATE,
    enum: LocationType,
    description: 'Type of the location',
  })
  type: LocationType;

  @ApiProperty({
    example: '60d21b4667d0d8992e610c70',
    description: 'Parent location ID',
    nullable: true,
  })
  parent_id: string | null;

  @ApiProperty({ example: true, description: 'Whether the location is active' })
  is_active: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the location is serviceable',
  })
  is_serviceable: boolean;

  @ApiPropertyOptional({ type: GeoLocationResponseDto })
  geo_location?: GeoLocationResponseDto;

  @ApiPropertyOptional({ example: 12.9716 })
  latitude?: number;

  @ApiPropertyOptional({ example: 77.5946 })
  longitude?: number;

  @ApiPropertyOptional({
    example: '2026-06-12T10:00:00.000Z',
    description: 'Created timestamp',
  })
  createdAt?: Date;

  @ApiPropertyOptional({
    example: '2026-06-12T10:00:00.000Z',
    description: 'Updated timestamp',
  })
  updatedAt?: Date;
}

export class PaginatedLocationResponseDto {
  @ApiProperty({ type: [LocationResponseDto] })
  data: LocationResponseDto[];

  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}

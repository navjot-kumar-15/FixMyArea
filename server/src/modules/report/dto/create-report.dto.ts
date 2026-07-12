import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  ValidateNested,
  IsNumber,
  IsMongoId,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ReportPriority,
  VisibilityType,
} from '../../../database/schemas/report.schema';

class ReportImageDto {
  @ApiProperty({ description: 'URL of the image', required: true })
  @IsString()
  url: string;

  @ApiPropertyOptional({
    description: 'Public ID of the image for cloud storage',
    required: false,
  })
  @IsString()
  @IsOptional()
  public_id?: string;
}

class ReportLocationDto {
  @ApiPropertyOptional({
    description: 'Type of location',
    default: 'Point',
    enum: ['Point'],
    required: false,
  })
  @IsString()
  @IsOptional()
  type?: string = 'Point';

  @ApiProperty({
    description: 'Coordinates [longitude, latitude]',
    type: [Number],
    required: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  coordinates: number[];
}

export class CreateReportDto {
  @ApiProperty({
    description: 'Title of the report',
    example: 'Pothole on Main St',
    maxLength: 150,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : '',
  )
  title: string;

  @ApiProperty({
    description: 'Detailed description of the report',
    example: 'There is a huge pothole causing traffic slowdown.',
    maxLength: 2000,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : '',
  )
  description: string;

  @ApiProperty({
    description: 'MongoDB ID of the category',
    type: String,
    example: '60d21b4667d0d8992e610c85',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' && Types.ObjectId.isValid(value)
      ? new Types.ObjectId(value)
      : value,
  )
  category_id: Types.ObjectId;

  @ApiPropertyOptional({
    description: 'Array of images',
    type: [ReportImageDto],
    required: false,
    default: [],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReportImageDto)
  images?: ReportImageDto[];

  @ApiPropertyOptional({
    description: 'Array of images for report resolution',
    type: [String],
    required: false,
    default: [],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resolution_images?: string[];

  @ApiProperty({
    description: 'Geospatial location of the report',
    type: ReportLocationDto,
    required: true,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ReportLocationDto)
  location: ReportLocationDto;

  @ApiPropertyOptional({
    description: 'Formatted address',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'City',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'State',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'Country',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'Landmark',
    required: false,
  })
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiPropertyOptional({
    description: 'Ward Number',
    required: false,
  })
  @IsOptional()
  @IsString()
  ward_number?: string;

  @ApiPropertyOptional({
    description: 'Pincode/Zipcode',
    required: true,
  })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({
    description: 'Priority of the report',
    enum: ReportPriority,
    default: ReportPriority.Medium,
    required: false,
  })
  @IsOptional()
  @IsEnum(ReportPriority)
  priority?: ReportPriority;

  @ApiProperty({
    description: 'MongoDB ID of the user who created the report',
    type: String,
    example: '60d0fe4f5311236168a109eb',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' && Types.ObjectId.isValid(value)
      ? new Types.ObjectId(value)
      : value,
  )
  created_by: Types.ObjectId;

  @ApiPropertyOptional({
    description: 'Tags for the report',
    type: [String],
    required: false,
    default: [],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Visibility of the report',
    enum: VisibilityType,
    default: VisibilityType.Public,
    required: false,
  })
  @IsOptional()
  @IsEnum(VisibilityType)
  visibility?: VisibilityType;
}

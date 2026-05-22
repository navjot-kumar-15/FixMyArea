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
import { ReportPriority, VisibilityType } from '../../../database/schemas/report.schema';

class ReportImageDto {
  @ApiProperty({ description: 'URL of the image' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'Public ID of the image for cloud storage' })
  @IsString()
  @IsNotEmpty()
  publicId: string;
}

class ReportLocationDto {
  @ApiProperty({ description: 'Type of location', default: 'Point', enum: ['Point'] })
  @IsString()
  @IsOptional()
  type?: string = 'Point';

  @ApiProperty({ description: 'Coordinates [longitude, latitude]', type: [Number] })
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
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @Transform(({ value }) => value?.trim())
  title: string;

  @ApiProperty({
    description: 'Detailed description of the report',
    example: 'There is a huge pothole causing traffic slowdown.',
    maxLength: 2000,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  @Transform(({ value }) => value?.trim())
  description: string;

  @ApiProperty({
    description: 'MongoDB ID of the category',
    type: String,
    example: '60d21b4667d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value,
  )
  category: Types.ObjectId;

  @ApiPropertyOptional({
    description: 'Array of images',
    type: [ReportImageDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReportImageDto)
  images?: ReportImageDto[];

  @ApiProperty({
    description: 'Geospatial location of the report',
    type: ReportLocationDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ReportLocationDto)
  location: ReportLocationDto;

  @ApiPropertyOptional({ description: 'Formatted address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'City' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'State' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Country' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Pincode/Zipcode' })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({
    description: 'Priority of the report',
    enum: ReportPriority,
    default: ReportPriority.Medium,
  })
  @IsOptional()
  @IsEnum(ReportPriority)
  priority?: ReportPriority;

  @ApiProperty({
    description: 'MongoDB ID of the user who created the report',
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value,
  )
  createdBy: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Tags for the report', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Visibility of the report',
    enum: VisibilityType,
    default: VisibilityType.Public,
  })
  @IsOptional()
  @IsEnum(VisibilityType)
  visibility?: VisibilityType;
}

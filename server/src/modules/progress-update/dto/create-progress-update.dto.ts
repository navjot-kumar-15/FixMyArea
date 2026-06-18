import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Max,
  IsInt,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';

export class ProgressImageDto {
  @ApiProperty({ description: 'URL of the progress image' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiPropertyOptional({
    description: 'Public ID of the image for cloud storage',
  })
  @IsOptional()
  @IsString()
  public_id?: string;
}

export class CreateProgressUpdateDto {
  @ApiProperty({ description: 'MongoDB ObjectID of the report' })
  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value,
  )
  report_id: Types.ObjectId;

  @ApiProperty({
    description: 'MongoDB ObjectID of the worker making the update',
  })
  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value,
  )
  worker_id: Types.ObjectId;

  @ApiProperty({ description: 'A note describing the progress update' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  note: string;

  @ApiProperty({ description: 'Progress percentage (0-100)' })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @Max(100)
  progress_percentage: number;

  @ApiPropertyOptional({
    type: [ProgressImageDto],
    description: 'Optional progress images',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgressImageDto)
  images?: ProgressImageDto[];

  @ApiPropertyOptional({
    description: 'Is this the final update for the task?',
  })
  @IsOptional()
  @IsBoolean()
  is_final_update?: boolean;
}

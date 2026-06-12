import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';

export class UpdateProgressUpdateDto {
  @ApiPropertyOptional({ description: 'A note describing the progress update' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;

  @ApiPropertyOptional({ description: 'Progress percentage (0-100)' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @Max(100)
  progress_percentage?: number;

  @ApiPropertyOptional({ description: 'Is this the final update for the task?' })
  @IsOptional()
  @IsBoolean()
  is_final_update?: boolean;

  @ApiPropertyOptional({ description: 'Is this update verified?' })
  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @ApiPropertyOptional({ description: 'MongoDB ObjectID of the user who verified the update' })
  @IsOptional()
  @IsMongoId()
  @Transform(({ value }) => Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value)
  verified_by?: Types.ObjectId;
}

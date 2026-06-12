import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';

export class CreateAssignmentDto {
  @ApiProperty({ description: 'MongoDB ObjectID of the report' })
  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) => Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value)
  report_id: Types.ObjectId;

  @ApiProperty({ description: 'MongoDB ObjectID of the worker assigned' })
  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) => Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value)
  worker_id: Types.ObjectId;

  @ApiProperty({ description: 'MongoDB ObjectID of the user assigning the task' })
  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) => Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value)
  assigned_by: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Optional instruction or note' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;
}

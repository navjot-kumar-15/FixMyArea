import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({ description: 'MongoDB ObjectID of the report' })
  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value,
  )
  report_id: Types.ObjectId;

  @ApiProperty({
    description: 'MongoDB ObjectID of the user writing the comment',
  })
  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value,
  )
  user_id: Types.ObjectId;

  @ApiProperty({ description: 'Content of the comment' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  message: string;

  @ApiPropertyOptional({
    description: 'Optional MongoDB ObjectID of the parent comment',
  })
  @IsOptional()
  @IsMongoId()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value,
  )
  parent_comment_id?: Types.ObjectId;
}

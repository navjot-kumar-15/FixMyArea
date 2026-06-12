import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ description: 'Content of the comment' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  message: string;
}

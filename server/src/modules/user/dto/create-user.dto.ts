import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({ description: 'Full name of the user', example: 'John Doe' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  full_name?: string;

  @ApiProperty({ description: 'First name of the user (Required)', example: 'john' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  first_name: string;

  @ApiPropertyOptional({ description: 'Last name of the user', example: 'doe' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  last_name?: string;

  @ApiPropertyOptional({ description: 'URL to the profile picture', example: 'https://example.com/profile.jpg' })
  @IsOptional()
  @IsUrl()
  @Transform(({ value }) => value?.trim())
  profile_picture_url?: string;

  @ApiProperty({ description: 'Email address of the user (Required)', example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1234567890' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  phone_number?: string;

  @ApiPropertyOptional({ description: 'MongoDB ID of the assigned role', type: String })
  @IsOptional()
  @IsMongoId()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value,
  )
  role_id?: Types.ObjectId;

  @ApiPropertyOptional({ description: 'MongoDB ID of the user address', type: String })
  @IsOptional()
  @IsMongoId()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value,
  )
  address_id?: Types.ObjectId;
}

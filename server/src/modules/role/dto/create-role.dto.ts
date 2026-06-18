import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    example: 'moderator',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the role',
    example: 'Can edit and close reports',
    default: '',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiPropertyOptional({
    description: 'List of fine-grained permissions',
    example: ['edit:reports', 'close:reports'],
    type: [String],
    default: [],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @ApiPropertyOptional({
    description: 'Status of the role',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

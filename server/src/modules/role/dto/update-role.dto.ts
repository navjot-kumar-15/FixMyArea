import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateRoleDto {
  @ApiPropertyOptional({
    description: 'Name of the role',
    example: 'moderator',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  name?: string;

  @ApiPropertyOptional({
    description: 'Description of the role',
    example: 'Can edit and close reports',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiPropertyOptional({
    description: 'List of fine-grained permissions',
    example: ['edit:reports', 'close:reports'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @ApiPropertyOptional({
    description: 'Status of the role',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

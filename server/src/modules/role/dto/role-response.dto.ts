import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109ea', description: 'Role ID' })
  id: string;

  @ApiProperty({ example: 'moderator', description: 'Name of the role' })
  name: string;

  @ApiProperty({
    example: 'Can edit and close reports',
    description: 'Description of the role',
  })
  description: string;

  @ApiProperty({
    example: ['edit:reports', 'close:reports'],
    type: [String],
    description: 'List of permissions associated with the role',
  })
  permissions: string[];

  @ApiProperty({ example: true, description: 'Whether the role is active' })
  is_active: boolean;

  @ApiPropertyOptional({
    example: '2026-06-12T10:00:00.000Z',
    description: 'Created timestamp',
  })
  createdAt?: Date;

  @ApiPropertyOptional({
    example: '2026-06-12T10:00:00.000Z',
    description: 'Updated timestamp',
  })
  updatedAt?: Date;
}

export class PaginatedRoleResponseDto {
  @ApiProperty({ type: [RoleResponseDto] })
  data: RoleResponseDto[];

  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}

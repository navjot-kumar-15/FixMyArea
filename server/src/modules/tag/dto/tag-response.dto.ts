import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TagResponseDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109eb', description: 'Tag ID' })
  id: string;

  @ApiProperty({ example: 'Urgent', description: 'Name of the tag' })
  name: string;

  @ApiPropertyOptional({ example: 'Requires immediate attention', description: 'Detailed description of the tag' })
  description?: string;

  @ApiProperty({ example: '#e74c3c', description: 'Theme color code' })
  color: string;

  @ApiProperty({ example: true, description: 'Tag status (active/inactive)' })
  is_active: boolean;

  @ApiPropertyOptional({ example: '2026-06-12T10:00:00.000Z', description: 'Created timestamp' })
  createdAt?: Date;

  @ApiPropertyOptional({ example: '2026-06-12T10:00:00.000Z', description: 'Updated timestamp' })
  updatedAt?: Date;
}

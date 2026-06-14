import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'Category ID' })
  id: string;

  @ApiProperty({ example: 'Pothole', description: 'Name of the category' })
  name: string;

  @ApiProperty({ example: 'Road damage and potholes needing repair', description: 'Description of the category' })
  description: string;

  @ApiProperty({ example: 'pwd', description: 'Municipal department' })
  department: string;

  @ApiProperty({ example: 'road', description: 'Icon identifier' })
  icon: string;

  @ApiProperty({ example: '#e74c3c', description: 'Theme color code' })
  color: string;

  @ApiProperty({ example: 4, description: 'Priority weight' })
  priority_weight: number;

  @ApiProperty({ example: 48, description: 'SLA hours' })
  sla_hours: number;

  @ApiProperty({ example: true, description: 'Whether the category is active' })
  is_active: boolean;

  @ApiPropertyOptional({ example: '2026-06-12T10:00:00.000Z', description: 'Created timestamp' })
  createdAt?: Date;

  @ApiPropertyOptional({ example: '2026-06-12T10:00:00.000Z', description: 'Updated timestamp' })
  updatedAt?: Date;
}

export class PaginatedCategoryResponseDto {
  @ApiProperty({ type: [CategoryResponseDto] })
  data: CategoryResponseDto[];

  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}

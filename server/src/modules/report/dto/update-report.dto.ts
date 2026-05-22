import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { ReportStatus } from '../../../database/schemas/report.schema';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @ApiPropertyOptional({
    description: 'Status of the report',
    enum: ReportStatus,
  })
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;

  @ApiPropertyOptional({ description: 'Is the report verified by an admin?' })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiPropertyOptional({ description: 'Is the report resolved?' })
  @IsOptional()
  @IsBoolean()
  isResolved?: boolean;
}

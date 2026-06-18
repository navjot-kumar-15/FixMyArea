import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiResponse as CustomResponse } from '../../common/responses/api-response';
import { MESSAGES } from '../../common/constants/messages.constant';
import { FilterReportDto } from './dto/filter-report.dto';
import {
  ReportResponseDto,
  PaginatedReportResponseDto,
} from './dto/report-response.dto';
import { ReportMapper } from './mapper/report.mapper';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  @ApiBody({
    type: CreateReportDto,
    required: true,
    description: 'Report payload',
  })
  @ApiResponse({
    status: 201,
    type: ReportResponseDto,
    description: 'The report has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Validation error in payload.' })
  async create(@Body() createReportDto: CreateReportDto) {
    try {
      const report = await this.reportService.create(createReportDto);
      const mapped = ReportMapper.toResponse(report);
      return CustomResponse.success(mapped, MESSAGES.REPORT.CREATED, 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      if (error instanceof BadRequestException) {
        return CustomResponse.error(message, null, 400);
      }
      return CustomResponse.error(message, null, 500);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({
    status: 200,
    type: PaginatedReportResponseDto,
    description: 'Return an array of all reports.',
  })
  async findAll(@Query() filterReportDto: FilterReportDto) {
    try {
      const paginatedResult = await this.reportService.findAll(filterReportDto);
      const mappedResult: PaginatedReportResponseDto = {
        ...paginatedResult,
        data: ReportMapper.toResponseList(paginatedResult.data),
      };
      return CustomResponse.success(mappedResult, MESSAGES.REPORT.FETCHED_ALL);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return CustomResponse.error(message, null, 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a report by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB ObjectID of the report (Required)',
  })
  @ApiResponse({
    status: 200,
    type: ReportResponseDto,
    description: 'Return the specific report.',
  })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  async findOne(@Param('id') id: string) {
    try {
      const report = await this.reportService.findOne(id);
      const mapped = ReportMapper.toResponse(report);
      return CustomResponse.success(mapped, MESSAGES.REPORT.FETCHED);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      if (error instanceof NotFoundException) {
        return CustomResponse.error(message, null, 404);
      }
      return CustomResponse.error(message, null, 500);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a report by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB ObjectID of the report (Required)',
  })
  @ApiBody({
    type: UpdateReportDto,
    required: true,
    description: 'Fields to update.',
  })
  @ApiResponse({
    status: 200,
    type: ReportResponseDto,
    description: 'The report has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    try {
      const report = await this.reportService.update(id, updateReportDto);
      const mapped = ReportMapper.toResponse(report);
      return CustomResponse.success(mapped, MESSAGES.REPORT.UPDATED);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      if (error instanceof BadRequestException) {
        return CustomResponse.error(message, null, 400);
      }
      if (error instanceof NotFoundException) {
        return CustomResponse.error(message, null, 404);
      }
      return CustomResponse.error(message, null, 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a report by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB ObjectID of the report (Required)',
  })
  @ApiResponse({
    status: 200,
    type: ReportResponseDto,
    description: 'The report has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  async remove(@Param('id') id: string) {
    try {
      const report = await this.reportService.remove(id);
      const mapped = ReportMapper.toResponse(report);
      return CustomResponse.success(mapped, MESSAGES.REPORT.DELETED);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      if (error instanceof NotFoundException) {
        return CustomResponse.error(message, null, 404);
      }
      return CustomResponse.error(message, null, 500);
    }
  }
}

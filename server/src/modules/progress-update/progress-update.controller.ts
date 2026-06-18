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
import { ProgressUpdateService } from './progress-update.service';
import { CreateProgressUpdateDto } from './dto/create-progress-update.dto';
import { UpdateProgressUpdateDto } from './dto/update-progress-update.dto';
import { FilterProgressUpdateDto } from './dto/filter-progress-update.dto';
import {
  ProgressUpdateResponseDto,
  PaginatedProgressUpdateResponseDto,
} from './dto/progress-update-response.dto';
import { ProgressUpdateMapper } from './mapper/progress-update.mapper';
import { ApiResponse as CustomResponse } from '../../common/responses/api-response';
import { MESSAGES } from '../../common/constants/messages.constant';

@ApiTags('ProgressUpdate')
@Controller('progress-update')
export class ProgressUpdateController {
  constructor(private readonly progressUpdateService: ProgressUpdateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new progress update' })
  @ApiBody({ type: CreateProgressUpdateDto })
  @ApiResponse({
    status: 201,
    type: ProgressUpdateResponseDto,
    description: 'The progress update has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  async create(@Body() createProgressUpdateDto: CreateProgressUpdateDto) {
    try {
      const update = await this.progressUpdateService.create(
        createProgressUpdateDto,
      );
      const mapped = ProgressUpdateMapper.toResponse(update);
      return CustomResponse.success(
        mapped,
        MESSAGES.PROGRESS_UPDATE.CREATED,
        201,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all progress updates' })
  @ApiResponse({
    status: 200,
    type: PaginatedProgressUpdateResponseDto,
    description: 'All progress updates retrieved successfully.',
  })
  async findAll(@Query() filterProgressUpdateDto: FilterProgressUpdateDto) {
    try {
      const paginatedResult = await this.progressUpdateService.findAll(
        filterProgressUpdateDto,
      );
      const mappedResult: PaginatedProgressUpdateResponseDto = {
        ...paginatedResult,
        data: ProgressUpdateMapper.toResponseList(paginatedResult.data),
      };
      return CustomResponse.success(
        mappedResult,
        MESSAGES.PROGRESS_UPDATE.FETCHED_ALL,
      );
    } catch (error) {
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get progress update by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Progress Update MongoDB ID',
  })
  @ApiResponse({
    status: 200,
    type: ProgressUpdateResponseDto,
    description: 'Progress update retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Progress update not found.' })
  async findOne(@Param('id') id: string) {
    try {
      const update = await this.progressUpdateService.findOne(id);
      const mapped = ProgressUpdateMapper.toResponse(update);
      return CustomResponse.success(mapped, MESSAGES.PROGRESS_UPDATE.FETCHED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update progress update by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Progress Update MongoDB ID',
  })
  @ApiBody({ type: UpdateProgressUpdateDto })
  @ApiResponse({
    status: 200,
    type: ProgressUpdateResponseDto,
    description: 'Progress update updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Progress update not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateProgressUpdateDto: UpdateProgressUpdateDto,
  ) {
    try {
      const update = await this.progressUpdateService.update(
        id,
        updateProgressUpdateDto,
      );
      const mapped = ProgressUpdateMapper.toResponse(update);
      return CustomResponse.success(mapped, MESSAGES.PROGRESS_UPDATE.UPDATED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete progress update by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Progress Update MongoDB ID',
  })
  @ApiResponse({
    status: 200,
    type: ProgressUpdateResponseDto,
    description: 'Progress update deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Progress update not found.' })
  async remove(@Param('id') id: string) {
    try {
      const update = await this.progressUpdateService.remove(id);
      const mapped = ProgressUpdateMapper.toResponse(update);
      return CustomResponse.success(mapped, MESSAGES.PROGRESS_UPDATE.DELETED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }
}

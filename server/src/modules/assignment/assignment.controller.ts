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
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { FilterAssignmentDto } from './dto/filter-assignment.dto';
import {
  AssignmentResponseDto,
  PaginatedAssignmentResponseDto,
} from './dto/assignment-response.dto';
import { AssignmentMapper } from './mapper/assignment.mapper';
import { ApiResponse as CustomResponse } from '../../common/responses/api-response';
import { MESSAGES } from '../../common/constants/messages.constant';

@ApiTags('Assignment')
@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new assignment' })
  @ApiBody({ type: CreateAssignmentDto })
  @ApiResponse({
    status: 201,
    type: AssignmentResponseDto,
    description: 'The assignment has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    try {
      const assignment =
        await this.assignmentService.create(createAssignmentDto);
      const mapped = AssignmentMapper.toResponse(assignment);
      return CustomResponse.success(mapped, MESSAGES.ASSIGNMENT.CREATED, 201);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all assignments' })
  @ApiResponse({
    status: 200,
    type: PaginatedAssignmentResponseDto,
    description: 'All assignments retrieved successfully.',
  })
  async findAll(@Query() filterAssignmentDto: FilterAssignmentDto) {
    try {
      const paginatedResult =
        await this.assignmentService.findAll(filterAssignmentDto);
      const mappedResult: PaginatedAssignmentResponseDto = {
        ...paginatedResult,
        data: AssignmentMapper.toResponseList(paginatedResult.data),
      };
      return CustomResponse.success(
        mappedResult,
        MESSAGES.ASSIGNMENT.FETCHED_ALL,
      );
    } catch (error) {
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an assignment by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Assignment MongoDB ID',
  })
  @ApiResponse({
    status: 200,
    type: AssignmentResponseDto,
    description: 'Assignment retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Assignment not found.' })
  async findOne(@Param('id') id: string) {
    try {
      const assignment = await this.assignmentService.findOne(id);
      const mapped = AssignmentMapper.toResponse(assignment);
      return CustomResponse.success(mapped, MESSAGES.ASSIGNMENT.FETCHED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an assignment by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Assignment MongoDB ID',
  })
  @ApiBody({ type: UpdateAssignmentDto })
  @ApiResponse({
    status: 200,
    type: AssignmentResponseDto,
    description: 'Assignment updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Assignment not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    try {
      const assignment = await this.assignmentService.update(
        id,
        updateAssignmentDto,
      );
      const mapped = AssignmentMapper.toResponse(assignment);
      return CustomResponse.success(mapped, MESSAGES.ASSIGNMENT.UPDATED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an assignment by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Assignment MongoDB ID',
  })
  @ApiResponse({
    status: 200,
    type: AssignmentResponseDto,
    description: 'Assignment deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Assignment not found.' })
  async remove(@Param('id') id: string) {
    try {
      const assignment = await this.assignmentService.remove(id);
      const mapped = AssignmentMapper.toResponse(assignment);
      return CustomResponse.success(mapped, MESSAGES.ASSIGNMENT.DELETED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }
}

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
  ConflictException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagResponseDto } from './dto/tag-response.dto';
import { ApiResponse as CustomResponse } from '../../common/responses/api-response';
import { MESSAGES } from '../../common/constants/messages.constant';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBody({ type: CreateTagDto, required: true })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
    type: TagResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 409, description: 'Tag name already exists' })
  async create(@Body() createTagDto: CreateTagDto) {
    try {
      const tag = await this.tagService.create(createTagDto);
      return CustomResponse.success(
        tag,
        MESSAGES.TAG.CREATED,
        201,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        return CustomResponse.error(error.message, null, 409);
      }
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      const message = error instanceof Error ? error.message : 'Unknown error';
      return CustomResponse.error(message, null, 500);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiQuery({
    name: 'all',
    required: false,
    type: Boolean,
    description: 'If true, returns inactive tags as well',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tags',
    type: [TagResponseDto],
  })
  async findAll(@Query('all') all?: string) {
    try {
      const onlyActive = all !== 'true';
      const tags = await this.tagService.findAll(onlyActive);
      return CustomResponse.success(
        tags,
        MESSAGES.TAG.FETCHED_ALL,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return CustomResponse.error(message, null, 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tag by ID' })
  @ApiParam({ name: 'id', required: true, description: 'MongoDB ID of the tag' })
  @ApiResponse({
    status: 200,
    description: 'Tag details',
    type: TagResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  async findOne(@Param('id') id: string) {
    try {
      const tag = await this.tagService.findOne(id);
      return CustomResponse.success(
        tag,
        MESSAGES.TAG.FETCHED,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      const message = error instanceof Error ? error.message : 'Unknown error';
      return CustomResponse.error(message, null, 500);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tag by ID' })
  @ApiParam({ name: 'id', required: true, description: 'MongoDB ID of the tag' })
  @ApiBody({ type: UpdateTagDto, required: true })
  @ApiResponse({
    status: 200,
    description: 'Tag updated successfully',
    type: TagResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiResponse({ status: 409, description: 'Tag name already exists' })
  async update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    try {
      const tag = await this.tagService.update(id, updateTagDto);
      return CustomResponse.success(
        tag,
        MESSAGES.TAG.UPDATED,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        return CustomResponse.error(error.message, null, 409);
      }
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      const message = error instanceof Error ? error.message : 'Unknown error';
      return CustomResponse.error(message, null, 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag by ID' })
  @ApiParam({ name: 'id', required: true, description: 'MongoDB ID of the tag' })
  @ApiResponse({
    status: 200,
    description: 'Tag deleted successfully',
    type: TagResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  async remove(@Param('id') id: string) {
    try {
      const tag = await this.tagService.remove(id);
      return CustomResponse.success(
        tag,
        MESSAGES.TAG.DELETED,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      const message = error instanceof Error ? error.message : 'Unknown error';
      return CustomResponse.error(message, null, 500);
    }
  }
}

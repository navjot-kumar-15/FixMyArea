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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FilterCommentDto } from './dto/filter-comment.dto';
import { CommentResponseDto, PaginatedCommentResponseDto } from './dto/comment-response.dto';
import { CommentMapper } from './mapper/comment.mapper';
import { ApiResponse as CustomResponse } from '../../common/responses/api-response';
import { MESSAGES } from '../../common/constants/messages.constant';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, type: CommentResponseDto, description: 'The comment has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      const comment = await this.commentService.create(createCommentDto);
      const mapped = CommentMapper.toResponse(comment);
      return CustomResponse.success(mapped, MESSAGES.COMMENT.CREATED, 201);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, type: PaginatedCommentResponseDto, description: 'All comments retrieved successfully.' })
  async findAll(@Query() filterCommentDto: FilterCommentDto) {
    try {
      const paginatedResult = await this.commentService.findAll(filterCommentDto);
      const mappedResult: PaginatedCommentResponseDto = {
        ...paginatedResult,
        data: CommentMapper.toResponseList(paginatedResult.data),
      };
      return CustomResponse.success(mappedResult, MESSAGES.COMMENT.FETCHED_ALL);
    } catch (error) {
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Comment MongoDB ID' })
  @ApiResponse({ status: 200, type: CommentResponseDto, description: 'Comment retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  async findOne(@Param('id') id: string) {
    try {
      const comment = await this.commentService.findOne(id);
      const mapped = CommentMapper.toResponse(comment);
      return CustomResponse.success(mapped, MESSAGES.COMMENT.FETCHED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Comment MongoDB ID' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ status: 200, type: CommentResponseDto, description: 'Comment updated successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.commentService.update(id, updateCommentDto);
      const mapped = CommentMapper.toResponse(comment);
      return CustomResponse.success(mapped, MESSAGES.COMMENT.UPDATED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Comment MongoDB ID' })
  @ApiResponse({ status: 200, type: CommentResponseDto, description: 'Comment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  async remove(@Param('id') id: string) {
    try {
      const comment = await this.commentService.remove(id);
      const mapped = CommentMapper.toResponse(comment);
      return CustomResponse.success(mapped, MESSAGES.COMMENT.DELETED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }
}

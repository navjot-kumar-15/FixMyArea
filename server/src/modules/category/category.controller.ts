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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryMapper } from './mapper/category.mapper';
import { ApiResponse as CustomResponse } from '../../common/responses/api-response';
import { MESSAGES } from '../../common/constants/messages.constant';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 409, description: 'Category name already exists' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryService.create(createCategoryDto);
      return CustomResponse.success(
        CategoryMapper.toResponse(category),
        MESSAGES.CATEGORY.CREATED,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        return CustomResponse.error(error.message, null, 409);
      }
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiQuery({
    name: 'all',
    required: false,
    type: Boolean,
    description: 'If true, returns inactive categories as well',
  })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    type: [CategoryResponseDto],
  })
  async findAll(@Query('all') all?: string) {
    try {
      const onlyActive = all !== 'true';
      const categories = await this.categoryService.findAll(onlyActive);
      return CustomResponse.success(
        CategoryMapper.toResponseList(categories),
        MESSAGES.CATEGORY.FETCHED_ALL,
      );
    } catch (error) {
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ID of the category' })
  @ApiResponse({
    status: 200,
    description: 'Category details',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoryService.findOne(id);
      return CustomResponse.success(
        CategoryMapper.toResponse(category),
        MESSAGES.CATEGORY.FETCHED,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ID of the category' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 409, description: 'Category name already exists' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const category = await this.categoryService.update(id, updateCategoryDto);
      return CustomResponse.success(
        CategoryMapper.toResponse(category),
        MESSAGES.CATEGORY.UPDATED,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        return CustomResponse.error(error.message, null, 409);
      }
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ID of the category' })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async remove(@Param('id') id: string) {
    try {
      const category = await this.categoryService.remove(id);
      return CustomResponse.success(
        CategoryMapper.toResponse(category),
        MESSAGES.CATEGORY.DELETED,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }
}

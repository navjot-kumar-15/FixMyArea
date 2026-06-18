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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationResponseDto } from './dto/location-response.dto';
import { LocationMapper } from './mapper/location.mapper';
import { ApiResponse as CustomResponse } from '../../common/responses/api-response';
import { MESSAGES } from '../../common/constants/messages.constant';
import { LocationType } from '../../database/schemas/location.schema';

@ApiTags('Location')
@Controller('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({
    status: 201,
    description: 'Location created successfully',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Parent location not found' })
  @ApiResponse({
    status: 409,
    description: 'Location name already exists under this parent and type',
  })
  async create(@Body() createLocationDto: CreateLocationDto) {
    try {
      const location = await this.locationService.create(createLocationDto);
      return CustomResponse.success(
        LocationMapper.toResponse(location),
        MESSAGES.LOCATION.CREATED,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        return CustomResponse.error(error.message, null, 409);
      }
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: LocationType,
    description: 'Filter locations by type',
  })
  @ApiQuery({
    name: 'parent_id',
    required: false,
    type: String,
    description: 'Filter locations by parent ID',
  })
  @ApiQuery({
    name: 'is_active',
    required: false,
    type: Boolean,
    description: 'Filter locations by active status',
  })
  @ApiQuery({
    name: 'is_serviceable',
    required: false,
    type: Boolean,
    description: 'Filter locations by serviceable status',
  })
  @ApiResponse({
    status: 200,
    description: 'List of locations',
    type: [LocationResponseDto],
  })
  async findAll(
    @Query('type') type?: LocationType,
    @Query('parent_id') parent_id?: string,
    @Query('is_active') is_active?: string,
    @Query('is_serviceable') is_serviceable?: string,
  ) {
    try {
      const filters: any = {};
      if (type) {
        filters.type = type;
      }
      if (parent_id !== undefined) {
        filters.parent_id = parent_id;
      }
      if (is_active !== undefined) {
        filters.is_active = is_active === 'true';
      }
      if (is_serviceable !== undefined) {
        filters.is_serviceable = is_serviceable === 'true';
      }

      const locations = await this.locationService.findAll(filters);
      return CustomResponse.success(
        LocationMapper.toResponseList(locations),
        MESSAGES.LOCATION.FETCHED_ALL,
      );
    } catch (error) {
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ID of the location' })
  @ApiResponse({
    status: 200,
    description: 'Location details',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async findOne(@Param('id') id: string) {
    try {
      const location = await this.locationService.findOne(id);
      return CustomResponse.success(
        LocationMapper.toResponse(location),
        MESSAGES.LOCATION.FETCHED,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ID of the location' })
  @ApiBody({ type: UpdateLocationDto })
  @ApiResponse({
    status: 200,
    description: 'Location updated successfully',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error or invalid ID' })
  @ApiResponse({ status: 404, description: 'Location or Parent not found' })
  @ApiResponse({ status: 409, description: 'Location name conflict' })
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    try {
      const location = await this.locationService.update(id, updateLocationDto);
      return CustomResponse.success(
        LocationMapper.toResponse(location),
        MESSAGES.LOCATION.UPDATED,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        return CustomResponse.error(error.message, null, 409);
      }
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ID of the location' })
  @ApiResponse({
    status: 200,
    description: 'Location deleted successfully',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @ApiResponse({
    status: 409,
    description: 'Location has active sub-locations',
  })
  async remove(@Param('id') id: string) {
    try {
      const location = await this.locationService.remove(id);
      return CustomResponse.success(
        LocationMapper.toResponse(location),
        MESSAGES.LOCATION.DELETED,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        return CustomResponse.error(error.message, null, 409);
      }
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }
}

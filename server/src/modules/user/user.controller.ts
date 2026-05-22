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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse as CustomResponse } from '../../common/responses/api-response';
import { MESSAGES } from '../../common/constants/messages.constant';
import { FilterUserDto } from './dto/filter-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    required: true,
    description:
      'User payload. REQUIRED: first_name, email, password. OPTIONAL: full_name, last_name, profile_picture_url, phone_number, role_id, address_id.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Validation error in payload.' })
  @ApiResponse({
    status: 409,
    description: 'User with this email or phone already exists.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
   try {
     const user = await this.userService.create(createUserDto);
     return CustomResponse.success(user, MESSAGES.USER.CREATED);
   } catch (error) {
    if(error instanceof BadRequestException){
      return CustomResponse.error(error.message, null, 400);
    }
    if(error instanceof NotFoundException){
      return CustomResponse.error(error.message, null, 404);
    }
    return CustomResponse.error(error.message, null, 500);
   }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return an array of all users.' })
  async findAll(@Query() filterUserDto: FilterUserDto) {
   try {
     const users = await this.userService.findAll(filterUserDto);
     return CustomResponse.success(users, MESSAGES.USER.FETCHED_ALL);
   } catch (error) {
    if(error instanceof BadRequestException){
      return CustomResponse.error(error.message, null, 400);
    }
    if(error instanceof NotFoundException){
      return CustomResponse.error(error.message, null, 404);
    }
    return CustomResponse.error(error.message, null, 500);
   }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB ObjectID of the user (Required)',
  })
  @ApiResponse({ status: 200, description: 'Return the specific user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return CustomResponse.success(user, MESSAGES.USER.FETCHED);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB ObjectID of the user (Required)',
  })
  @ApiBody({
    type: UpdateUserDto,
    required: true,
    description:
      'Fields to update. ALL FIELDS ARE OPTIONAL. Includes restricted admin fields (is_banned, etc.).',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return CustomResponse.success(user, MESSAGES.USER.UPDATED);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB ObjectID of the user (Required)',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: string) {
    try {
      const user = await this.userService.remove(id);
      return CustomResponse.success(user, MESSAGES.USER.DELETED);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return CustomResponse.error(error.message, null, 400);
      }
      if (error instanceof NotFoundException) {
        return CustomResponse.error(error.message, null, 404);
      }
      return CustomResponse.error(error.message, null, 500);
    }
  }
}

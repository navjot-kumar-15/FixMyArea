import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './mapper/user.mapper';
import { FilterUserDto } from './dto/filter-user.dto';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // CREATE
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const {email, } = createUserDto;
    let isExist = await this.userModel.findOne({email});
    if(isExist){
      throw new BadRequestException(`User with email ${email} already exists`);
    }

    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();
    return UserMapper.toDomain(savedUser) as IUser;
  }

  // FIND BY EMAIL (For Auth)
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // UPDATE PASSWORD (For Auth)
  async updatePassword(id: string, newPasswordHash: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { password: newPasswordHash }).exec();
  }

  // UPDATE REFRESH TOKEN (For Auth)
  async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { refresh_token: refreshToken }).exec();
  }

  // READ ALL
  async findAll(filterUserDto: FilterUserDto): Promise<PaginatedResult<IUser>> {
    const { page = 1, limit = 10, search } = filterUserDto || {};
    const skip = (page - 1) * limit;

    const query: any = { is_deleted: { $ne: true }, is_banned: false };
    
    if (search) {
      query.$or = [
        { first_name: { $regex: search, $options: 'i' } },
        { last_name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const [users, total] = await Promise.all([
      this.userModel.find(query).skip(skip).limit(limit),
      this.userModel.countDocuments(query),
    ]);

    return {
      data: UserMapper.toDomainList(users),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // READ ONE
  async findOne(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserMapper.toDomain(user) as IUser;
  }

  // UPDATE
  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserMapper.toDomain(updatedUser) as IUser;
  }

  // DELETE
  async remove(id: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndUpdate(id,{is_deleted: true});
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserMapper.toDomain(deletedUser) as IUser;
  }
}

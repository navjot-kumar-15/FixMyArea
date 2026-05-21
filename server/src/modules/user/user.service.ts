import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // CREATE
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();
    return UserMapper.toDomain(savedUser) as IUser;
  }

  // READ ALL
  async findAll(): Promise<IUser[]> {
    const users = await this.userModel.find();
    return UserMapper.toDomainList(users);
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
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserMapper.toDomain(deletedUser) as IUser;
  }
}

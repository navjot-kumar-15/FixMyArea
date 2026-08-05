import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../../database/schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IRole } from './interfaces/role.interface';
import { RoleMapper } from './mapper/role.mapper';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<any> {
    const nameNormalized = createRoleDto.name.toLowerCase().trim();
    const existing = await this.roleModel
      .findOne({ name: nameNormalized })
      .exec();
    if (existing) {
      throw new ConflictException(
        `Role with name "${createRoleDto.name}" already exists.`,
      );
    }

    const newRole = new this.roleModel({
      ...createRoleDto,
      name: nameNormalized,
    });
    const saved = await newRole.save();
    const domain = RoleMapper.toDomain(saved);
    return RoleMapper.toResponse(domain);
  }

  async findAll(): Promise<any> {
    const roles = await this.roleModel.find().exec();
    const domainList = RoleMapper.toDomainList(roles);
    return RoleMapper.toResponseList(domainList);
  }

  async findOne(id: string): Promise<any> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }
    const domain = RoleMapper.toDomain(role);
    return RoleMapper.toResponse(domain);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<any> {
    if (updateRoleDto.name) {
      updateRoleDto.name = updateRoleDto.name.toLowerCase().trim();
      const existing = await this.roleModel
        .findOne({ name: updateRoleDto.name, _id: { $ne: id } })
        .exec();
      if (existing) {
        throw new ConflictException(
          `Another role with name "${updateRoleDto.name}" already exists.`,
        );
      }
    }

    const updated = await this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }
    const domain = RoleMapper.toDomain(updated);
    return RoleMapper.toResponse(domain);
  }

  async remove(id: string): Promise<any> {
    const deleted = await this.roleModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }
    const domain = RoleMapper.toDomain(deleted);
    return RoleMapper.toResponse(domain);
  }
}

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from '../../database/schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ITag } from './interfaces/tag.interface';
import { TagMapper } from './mapper/tag.mapper';

@Injectable()
export class TagService {
  constructor(
    @InjectModel('Tag') private readonly tagModel: Model<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<any> {
    const nameTrimmed = createTagDto.name.trim();
    const existing = await this.tagModel
      .findOne({ name: { $regex: new RegExp(`^${nameTrimmed}$`, 'i') } })
      .exec();
    if (existing) {
      throw new ConflictException(
        `Tag with name "${createTagDto.name}" already exists.`,
      );
    }

    const newTag = new this.tagModel({
      ...createTagDto,
      name: nameTrimmed,
    });
    const saved = await newTag.save();
    const domain = TagMapper.toDomain(saved);
    return TagMapper.toResponse(domain);
  }

  async findAll(onlyActive = true): Promise<any> {
    const filter = onlyActive ? { is_active: true } : {};
    const tags = await this.tagModel.find(filter).exec();
    const domainList = TagMapper.toDomainList(tags);
    return TagMapper.toResponseList(domainList);
  }

  async findOne(id: string): Promise<any> {
    const tag = await this.tagModel.findById(id).exec();
    if (!tag) {
      throw new NotFoundException(`Tag with ID "${id}" not found.`);
    }
    const domain = TagMapper.toDomain(tag);
    return TagMapper.toResponse(domain);
  }

  async update(
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<any> {
    if (updateTagDto.name) {
      const nameTrimmed = updateTagDto.name.trim();
      const existing = await this.tagModel
        .findOne({
          name: { $regex: new RegExp(`^${nameTrimmed}$`, 'i') },
          _id: { $ne: id },
        })
        .exec();
      if (existing) {
        throw new ConflictException(
          `Another tag with name "${updateTagDto.name}" already exists.`,
        );
      }
      updateTagDto.name = nameTrimmed;
    }

    const updated = await this.tagModel
      .findByIdAndUpdate(id, updateTagDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Tag with ID "${id}" not found.`);
    }
    const domain = TagMapper.toDomain(updated);
    return TagMapper.toResponse(domain);
  }

  async remove(id: string): Promise<any> {
    const deleted = await this.tagModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Tag with ID "${id}" not found.`);
    }
    const domain = TagMapper.toDomain(deleted);
    return TagMapper.toResponse(domain);
  }
}

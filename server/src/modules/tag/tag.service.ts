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

  async create(createTagDto: CreateTagDto): Promise<ITag> {
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
    return TagMapper.toDomain(saved) as ITag;
  }

  async findAll(onlyActive = true): Promise<ITag[]> {
    const filter = onlyActive ? { is_active: true } : {};
    const tags = await this.tagModel.find(filter).exec();
    return TagMapper.toDomainList(tags);
  }

  async findOne(id: string): Promise<ITag> {
    const tag = await this.tagModel.findById(id).exec();
    if (!tag) {
      throw new NotFoundException(`Tag with ID "${id}" not found.`);
    }
    return TagMapper.toDomain(tag) as ITag;
  }

  async update(
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<ITag> {
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
    return TagMapper.toDomain(updated) as ITag;
  }

  async remove(id: string): Promise<ITag> {
    const deleted = await this.tagModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Tag with ID "${id}" not found.`);
    }
    return TagMapper.toDomain(deleted) as ITag;
  }
}

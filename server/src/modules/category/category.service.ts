import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../../database/schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interfaces/category.interface';
import { CategoryMapper } from './mapper/category.mapper';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    const nameTrimmed = createCategoryDto.name.trim();
    const existing = await this.categoryModel
      .findOne({ name: { $regex: new RegExp(`^${nameTrimmed}$`, 'i') } })
      .exec();
    if (existing) {
      throw new ConflictException(
        `Category with name "${createCategoryDto.name}" already exists.`,
      );
    }

    const newCategory = new this.categoryModel({
      ...createCategoryDto,
      name: nameTrimmed,
    });
    const saved = await newCategory.save();
    const domain = CategoryMapper.toDomain(saved);
    return CategoryMapper.toResponse(domain);
  }

  async findAll(onlyActive = true): Promise<any> {
    const filter = onlyActive ? { is_active: true } : {};
    const categories = await this.categoryModel.find(filter).exec();
    const domainList = CategoryMapper.toDomainList(categories);
    return CategoryMapper.toResponseList(domainList);
  }

  async findOne(id: string): Promise<any> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found.`);
    }
    const domain = CategoryMapper.toDomain(category);
    return CategoryMapper.toResponse(domain);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<any> {
    if (updateCategoryDto.name) {
      const nameTrimmed = updateCategoryDto.name.trim();
      const existing = await this.categoryModel
        .findOne({
          name: { $regex: new RegExp(`^${nameTrimmed}$`, 'i') },
          _id: { $ne: id },
        })
        .exec();
      if (existing) {
        throw new ConflictException(
          `Another category with name "${updateCategoryDto.name}" already exists.`,
        );
      }
      updateCategoryDto.name = nameTrimmed;
    }

    const updated = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Category with ID "${id}" not found.`);
    }
    const domain = CategoryMapper.toDomain(updated);
    return CategoryMapper.toResponse(domain);
  }

  async remove(id: string): Promise<any> {
    const deleted = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Category with ID "${id}" not found.`);
    }
    const domain = CategoryMapper.toDomain(deleted);
    return CategoryMapper.toResponse(domain);
  }
}

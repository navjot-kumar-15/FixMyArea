import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgressUpdate } from '../../database/schemas/progress-update.schema';
import { IProgressUpdate } from './interfaces/progress-update.interface';
import { CreateProgressUpdateDto } from './dto/create-progress-update.dto';
import { UpdateProgressUpdateDto } from './dto/update-progress-update.dto';
import { ProgressUpdateMapper } from './mapper/progress-update.mapper';
import { FilterProgressUpdateDto } from './dto/filter-progress-update.dto';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

@Injectable()
export class ProgressUpdateService {
  constructor(
    @InjectModel(ProgressUpdate.name)
    private readonly progressUpdateModel: Model<ProgressUpdate>,
  ) {}

  // CREATE
  async create(
    createProgressUpdateDto: CreateProgressUpdateDto,
  ): Promise<any> {
    const newUpdate = new this.progressUpdateModel(createProgressUpdateDto);
    const savedUpdate = await newUpdate.save();
    const domain = ProgressUpdateMapper.toDomain(savedUpdate);
    return ProgressUpdateMapper.toResponse(domain);
  }

  // READ ALL
  async findAll(
    filterProgressUpdateDto: FilterProgressUpdateDto,
  ): Promise<PaginatedResult<any>> {
    const {
      page = 1,
      limit = 10,
      worker_id,
      report_id,
      is_verified,
    } = filterProgressUpdateDto || {};
    const skip = (page - 1) * limit;

    const query: any = { is_deleted: { $ne: true } };

    if (worker_id) {
      query.worker_id = worker_id;
    }
    if (report_id) {
      query.report_id = report_id;
    }
    if (is_verified !== undefined) {
      query.is_verified = is_verified;
    }

    const [updates, total] = await Promise.all([
      this.progressUpdateModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.progressUpdateModel.countDocuments(query),
    ]);

    const domainList = ProgressUpdateMapper.toDomainList(updates);

    return {
      data: ProgressUpdateMapper.toResponseList(domainList),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // READ ONE
  async findOne(id: string): Promise<any> {
    const update = await this.progressUpdateModel.findById(id);
    if (!update || update.is_deleted) {
      throw new NotFoundException(`Progress update with ID ${id} not found`);
    }
    const domain = ProgressUpdateMapper.toDomain(update);
    return ProgressUpdateMapper.toResponse(domain);
  }

  // UPDATE
  async update(
    id: string,
    updateProgressUpdateDto: UpdateProgressUpdateDto,
  ): Promise<any> {
    const updatePayload: any = { ...updateProgressUpdateDto };

    if (updateProgressUpdateDto.is_verified === true) {
      updatePayload.verified_at = new Date();
    }

    const updatedUpdate = await this.progressUpdateModel.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true },
    );

    if (!updatedUpdate) {
      throw new NotFoundException(`Progress update with ID ${id} not found`);
    }
    const domain = ProgressUpdateMapper.toDomain(updatedUpdate);
    return ProgressUpdateMapper.toResponse(domain);
  }

  // DELETE
  async remove(id: string): Promise<any> {
    const deletedUpdate = await this.progressUpdateModel.findByIdAndUpdate(
      id,
      {
        is_deleted: true,
        deleted_at: new Date(),
      },
      { new: true },
    );

    if (!deletedUpdate) {
      throw new NotFoundException(`Progress update with ID ${id} not found`);
    }
    const domain = ProgressUpdateMapper.toDomain(deletedUpdate);
    return ProgressUpdateMapper.toResponse(domain);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Report, ReportStatus } from '../../database/schemas/report.schema';
import { Location } from '../../database/schemas/location.schema';
import { IReport, IReportFilterQuery } from './interfaces/report.interface';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportMapper } from './mapper/report.mapper';
import { FilterReportDto } from './dto/filter-report.dto';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<Report>,
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}

  // CREATE
  async create(createReportDto: CreateReportDto): Promise<IReport> {
    let resolvedLocationId: Types.ObjectId | null = null;

    if (createReportDto.location_id) {
      resolvedLocationId = new Types.ObjectId(createReportDto.location_id);
    } else if (
      createReportDto.location &&
      createReportDto.location.coordinates &&
      createReportDto.location.coordinates.length === 2
    ) {
      const closest = await this.locationModel
        .findOne({
          geo_location: {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: [
                  createReportDto.location.coordinates[0],
                  createReportDto.location.coordinates[1],
                ],
              },
            },
          },
        })
        .exec();
      if (closest) {
        resolvedLocationId = closest._id;
      }
    }

    const reportData = {
      ...createReportDto,
      location_id: resolvedLocationId,
    };

    const newReport = new this.reportModel(reportData);
    const savedReport = await newReport.save();
    const domain = ReportMapper.toDomain(savedReport);
    if (!domain) {
      throw new BadRequestException('Failed to map saved report');
    }
    return domain;
  }

  // READ ALL
  async findAll(
    filterReportDto: FilterReportDto,
  ): Promise<PaginatedResult<IReport>> {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      status,
      location_id,
    } = filterReportDto || {};
    const skip = (page - 1) * limit;

    const query: IReportFilterQuery = { is_deleted: { $ne: true } };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = new Types.ObjectId(category);
    }

    if (status) {
      query.status = status as ReportStatus;
    }

    if (location_id) {
      query.location_id = new Types.ObjectId(location_id);
    }

    const [reports, total] = await Promise.all([
      this.reportModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .populate('category')
        .populate('location_id'),
      this.reportModel.countDocuments(query),
    ]);

    return {
      data: ReportMapper.toDomainList(reports),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // READ ONE
  async findOne(id: string): Promise<IReport> {
    const report = await this.reportModel
      .findById(id)
      .populate('category')
      .populate('location_id');
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    const domain = ReportMapper.toDomain(report);
    if (!domain) {
      throw new NotFoundException(`Report with ID ${id} could not be loaded`);
    }
    return domain;
  }

  // UPDATE
  async update(id: string, updateReportDto: UpdateReportDto): Promise<IReport> {
    let resolvedLocationId: Types.ObjectId | null | undefined = undefined;

    if (updateReportDto.location_id !== undefined) {
      resolvedLocationId = updateReportDto.location_id
        ? new Types.ObjectId(updateReportDto.location_id)
        : null;
    } else if (
      updateReportDto.location &&
      updateReportDto.location.coordinates &&
      updateReportDto.location.coordinates.length === 2
    ) {
      const closest = await this.locationModel
        .findOne({
          geo_location: {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: [
                  updateReportDto.location.coordinates[0],
                  updateReportDto.location.coordinates[1],
                ],
              },
            },
          },
        })
        .exec();
      if (closest) {
        resolvedLocationId = closest._id;
      } else {
        resolvedLocationId = null;
      }
    }

    const updateData = {
      ...updateReportDto,
      ...(resolvedLocationId !== undefined
        ? { location_id: resolvedLocationId }
        : {}),
    };

    const updatedReport = await this.reportModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('category')
      .populate('location_id');

    if (!updatedReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    const domain = ReportMapper.toDomain(updatedReport);
    if (!domain) {
      throw new NotFoundException(
        `Updated report with ID ${id} could not be loaded`,
      );
    }
    return domain;
  }

  // DELETE
  async remove(id: string): Promise<IReport> {
    const deletedReport = await this.reportModel.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true },
    );
    if (!deletedReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    const domain = ReportMapper.toDomain(deletedReport);
    if (!domain) {
      throw new NotFoundException(
        `Deleted report with ID ${id} could not be loaded`,
      );
    }
    return domain;
  }
}

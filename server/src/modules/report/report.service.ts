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

    if (
      createReportDto.location &&
      createReportDto.location.coordinates &&
      typeof createReportDto.location.coordinates.lat === 'number' &&
      typeof createReportDto.location.coordinates.lng === 'number'
    ) {
      const closest = await this.locationModel.findOne({
        geo_location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [
                createReportDto.location.coordinates.lng,
                createReportDto.location.coordinates.lat,
              ],
            },
          },
        },
      });
      if (closest) {
        resolvedLocationId = closest._id;
      }
    }

    const reportData: any = {
      ...createReportDto,
      location_id: resolvedLocationId && resolvedLocationId,
    };

    const newReport = await this.reportModel.create(reportData);
    // const savedReport = await newReport.save();
    const domain = ReportMapper.toDomain(newReport);
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

    const result = await this.reportModel.aggregate([
      {
        $match: query,
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            {
              $lookup: {
                from: 'categories',
                localField: 'category_id',
                foreignField: '_id',
                as: 'category',
              },
            },
            {
              $unwind: {
                path: '$category',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'created_by',
                foreignField: '_id',
                as: 'userDetail',
              },
            },
            {
              $unwind: {
                path: '$userDetail',
                preserveNullAndEmptyArrays: true,
              },
            },

            {
              $project: {
                // === Required properties (exactly what you showed in JSON) ===
                id: { $toString: '$_id' }, // convert ObjectId to string
                title: '$title',
                description: '$description',
                images: '$images',
                location: '$location',
                category: {
                  name: '$category.name',
                  icon: '$category.icon',
                  description: '$category.description',
                  color: '$category.color',
                },
                status: '$status',
                priority: '$priority',
                severity_score: '$severity_score',
                created_by: {
                  id: '$userDetail._id',
                  email: '$userDetail.email',
                },
                upvotes_count: '$upvotes_count',
                downvotes_count: '$downvotes_count',
                comments_count: '$comments_count',
                views_count: '$views_count',
                supporters_count: '$supporters_count',
                is_verified: '$is_verified',
                is_resolved: '$is_resolved',
                tags: '$tags',
                moderation: {
                  is_flagged: '$moderation.is_flagged',
                  flagged_reason: '$moderation.flagged_reason',
                },
                visibility: '$visibility',
                is_deleted: '$is_deleted',
                createdAt: '$createdAt',
                updatedAt: '$updatedAt',

                // === Optional but commonly used fields (add if needed) ===
                // _id: 0,                    // remove ObjectId if you only want 'id'
                // __v: 0,                    // remove MongoDB version key
              },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
    ]);

    const total = result[0]?.metadata[0]?.total || 0;
    const reports = result[0]?.data || [];

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

    if (
      updateReportDto.location &&
      updateReportDto.location.coordinates &&
      typeof updateReportDto.location.coordinates.lat === 'number' &&
      typeof updateReportDto.location.coordinates.lng === 'number'
    ) {
      const closest = await this.locationModel
        .findOne({
          geo_location: {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: [
                  updateReportDto.location.coordinates.lng,
                  updateReportDto.location.coordinates.lat,
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

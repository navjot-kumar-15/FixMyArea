import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from '../../database/schemas/report.schema';
import { IReport } from './interfaces/report.interface';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportMapper } from './mapper/report.mapper';
import { FilterReportDto } from './dto/filter-report.dto';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<Report>,
  ) {}

  // CREATE
  async create(createReportDto: CreateReportDto): Promise<IReport> {
    const newReport = new this.reportModel(createReportDto);
    const savedReport = await newReport.save();
    return ReportMapper.toDomain(savedReport) as IReport;
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
    } = filterReportDto || {};
    const skip = (page - 1) * limit;

    const query: any = { isDeleted: { $ne: true } };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }
    const [reports, total] = await Promise.all([
      this.reportModel.find(query).skip(skip).limit(limit).populate('category'),
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
    const report = await this.reportModel.findById(id).populate('category');
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return ReportMapper.toDomain(report) as IReport;
  }

  // UPDATE
  async update(id: string, updateReportDto: UpdateReportDto): Promise<IReport> {
    const updatedReport = await this.reportModel
      .findByIdAndUpdate(id, updateReportDto, { new: true })
      .populate('category');

    if (!updatedReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return ReportMapper.toDomain(updatedReport) as IReport;
  }

  // DELETE
  async remove(id: string): Promise<IReport> {
    const deletedReport = await this.reportModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!deletedReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return ReportMapper.toDomain(deletedReport) as IReport;
  }
}

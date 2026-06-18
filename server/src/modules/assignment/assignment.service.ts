import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment } from '../../database/schemas/assignment.schema';
import {
  IAssignment,
  AssignmentStatus,
} from './interfaces/assignment.interface';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentMapper } from './mapper/assignment.mapper';
import { FilterAssignmentDto } from './dto/filter-assignment.dto';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private readonly assignmentModel: Model<Assignment>,
  ) {}

  // CREATE
  async create(createAssignmentDto: CreateAssignmentDto): Promise<IAssignment> {
    const newAssignment = new this.assignmentModel({
      ...createAssignmentDto,
      status: AssignmentStatus.ASSIGNED,
      assigned_at: new Date(),
      is_active: true,
    });
    const savedAssignment = await newAssignment.save();
    return AssignmentMapper.toDomain(savedAssignment) as IAssignment;
  }

  // READ ALL
  async findAll(
    filterAssignmentDto: FilterAssignmentDto,
  ): Promise<PaginatedResult<IAssignment>> {
    const {
      page = 1,
      limit = 10,
      worker_id,
      report_id,
      status,
    } = filterAssignmentDto || {};
    const skip = (page - 1) * limit;

    const query: any = { is_deleted: { $ne: true } };

    if (worker_id) {
      query.worker_id = worker_id;
    }
    if (report_id) {
      query.report_id = report_id;
    }
    if (status) {
      query.status = status;
    }

    const [assignments, total] = await Promise.all([
      this.assignmentModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.assignmentModel.countDocuments(query),
    ]);

    return {
      data: AssignmentMapper.toDomainList(assignments),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // READ ONE
  async findOne(id: string): Promise<IAssignment> {
    const assignment = await this.assignmentModel.findById(id);
    if (!assignment || assignment.is_deleted) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return AssignmentMapper.toDomain(assignment) as IAssignment;
  }

  // UPDATE
  async update(
    id: string,
    updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<IAssignment> {
    const updatePayload: any = { ...updateAssignmentDto };

    // Set corresponding status date field if changed
    if (updateAssignmentDto.status) {
      const now = new Date();
      if (updateAssignmentDto.status === AssignmentStatus.ACCEPTED) {
        updatePayload.accepted_at = now;
      } else if (updateAssignmentDto.status === AssignmentStatus.REJECTED) {
        updatePayload.rejected_at = now;
        updatePayload.is_active = false;
      } else if (updateAssignmentDto.status === AssignmentStatus.COMPLETED) {
        updatePayload.completed_at = now;
        updatePayload.is_active = false;
      }
    }

    const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true },
    );

    if (!updatedAssignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return AssignmentMapper.toDomain(updatedAssignment) as IAssignment;
  }

  // DELETE
  async remove(id: string): Promise<IAssignment> {
    const deletedAssignment = await this.assignmentModel.findByIdAndUpdate(
      id,
      {
        is_deleted: true,
        is_active: false,
        deleted_at: new Date(),
      },
      { new: true },
    );

    if (!deletedAssignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return AssignmentMapper.toDomain(deletedAssignment) as IAssignment;
  }
}

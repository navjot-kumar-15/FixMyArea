import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../../database/schemas/comment.schema';
import { IComment } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentMapper } from './mapper/comment.mapper';
import { FilterCommentDto } from './dto/filter-comment.dto';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  // CREATE
  async create(createCommentDto: CreateCommentDto): Promise<any> {
    const newComment = new this.commentModel(createCommentDto);
    const savedComment = await newComment.save();
    const domain = CommentMapper.toDomain(savedComment);
    return CommentMapper.toResponse(domain);
  }

  // READ ALL
  async findAll(
    filterCommentDto: FilterCommentDto,
  ): Promise<PaginatedResult<any>> {
    const { page = 1, limit = 10, report_id, user_id } = filterCommentDto || {};
    const skip = (page - 1) * limit;

    const query: any = { is_deleted: { $ne: true } };

    if (report_id) {
      query.report_id = report_id;
    }
    if (user_id) {
      query.user_id = user_id;
    }

    const [comments, total] = await Promise.all([
      this.commentModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.commentModel.countDocuments(query),
    ]);

    const domainList = CommentMapper.toDomainList(comments);

    return {
      data: CommentMapper.toResponseList(domainList),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // READ ONE
  async findOne(id: string): Promise<any> {
    const comment = await this.commentModel.findById(id);
    if (!comment || comment.is_deleted) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    const domain = CommentMapper.toDomain(comment);
    return CommentMapper.toResponse(domain);
  }

  // UPDATE
  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<any> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      id,
      {
        ...updateCommentDto,
        is_edited: true,
        edited_at: new Date(),
      },
      { new: true },
    );

    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    const domain = CommentMapper.toDomain(updatedComment);
    return CommentMapper.toResponse(domain);
  }

  // DELETE (SOFT)
  async remove(id: string): Promise<any> {
    const deletedComment = await this.commentModel.findByIdAndUpdate(
      id,
      {
        is_deleted: true,
        deleted_at: new Date(),
      },
      { new: true },
    );

    if (!deletedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    const domain = CommentMapper.toDomain(deletedComment);
    return CommentMapper.toResponse(domain);
  }
}

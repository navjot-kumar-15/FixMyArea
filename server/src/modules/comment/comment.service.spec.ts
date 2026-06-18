import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comment } from '../../database/schemas/comment.schema';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('CommentService', () => {
  let service: CommentService;

  const mockComment = {
    _id: new Types.ObjectId(),
    report_id: new Types.ObjectId(),
    user_id: new Types.ObjectId(),
    message: 'Test comment message',
    is_edited: false,
    is_deleted: false,
  };

  const mockCommentModel: any = jest.fn().mockImplementation(() => ({
    ...mockComment,
    save: jest.fn().mockResolvedValue(mockComment),
  }));

  Object.assign(mockCommentModel, {
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      then: jest.fn().mockImplementation((resolve) => resolve([mockComment])),
    }),
    countDocuments: jest.fn().mockResolvedValue(1),
    findById: jest.fn().mockResolvedValue(mockComment),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockComment),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getModelToken(Comment.name),
          useValue: mockCommentModel,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a comment successfully', async () => {
      const dto = {
        report_id: mockComment.report_id,
        user_id: mockComment.user_id,
        message: 'Test comment message',
      };

      const result = await service.create(dto);
      expect(result).toBeDefined();
      expect(result.message).toEqual('Test comment message');
    });
  });

  describe('findAll', () => {
    it('should return paginated comments', async () => {
      const result = await service.findAll({});
      expect(result.data).toBeInstanceOf(Array);
      expect(mockCommentModel.find).toHaveBeenCalledWith({
        is_deleted: { $ne: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a comment', async () => {
      mockCommentModel.findById.mockResolvedValue(mockComment);
      const result = await service.findOne(mockComment._id.toString());
      expect(result).toBeDefined();
      expect(mockCommentModel.findById).toHaveBeenCalledWith(
        mockComment._id.toString(),
      );
    });

    it('should throw NotFoundException if comment not found', async () => {
      mockCommentModel.findById.mockResolvedValue(null);
      await expect(service.findOne('invalidId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

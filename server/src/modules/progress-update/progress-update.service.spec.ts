import { Test, TestingModule } from '@nestjs/testing';
import { ProgressUpdateService } from './progress-update.service';
import { getModelToken } from '@nestjs/mongoose';
import { ProgressUpdate } from '../../database/schemas/progress-update.schema';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ProgressUpdateService', () => {
  let service: ProgressUpdateService;

  const mockProgressUpdate = {
    _id: new Types.ObjectId(),
    report_id: new Types.ObjectId(),
    worker_id: new Types.ObjectId(),
    note: 'Test progress update note',
    progress_percentage: 50,
    images: [],
    is_final_update: false,
    is_verified: false,
    is_deleted: false,
  };

  const mockProgressUpdateModel: any = jest.fn().mockImplementation(() => ({
    ...mockProgressUpdate,
    save: jest.fn().mockResolvedValue(mockProgressUpdate),
  }));

  Object.assign(mockProgressUpdateModel, {
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      then: jest
        .fn()
        .mockImplementation((resolve) => resolve([mockProgressUpdate])),
    }),
    countDocuments: jest.fn().mockResolvedValue(1),
    findById: jest.fn().mockResolvedValue(mockProgressUpdate),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockProgressUpdate),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgressUpdateService,
        {
          provide: getModelToken(ProgressUpdate.name),
          useValue: mockProgressUpdateModel,
        },
      ],
    }).compile();

    service = module.get<ProgressUpdateService>(ProgressUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a progress update successfully', async () => {
      const dto = {
        report_id: mockProgressUpdate.report_id,
        worker_id: mockProgressUpdate.worker_id,
        note: 'Test progress update note',
        progress_percentage: 50,
      };

      const result = await service.create(dto);
      expect(result).toBeDefined();
      expect(result.progress_percentage).toEqual(50);
    });
  });

  describe('findAll', () => {
    it('should return paginated progress updates', async () => {
      const result = await service.findAll({});
      expect(result.data).toBeInstanceOf(Array);
      expect(mockProgressUpdateModel.find).toHaveBeenCalledWith({
        is_deleted: { $ne: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a progress update', async () => {
      mockProgressUpdateModel.findById.mockResolvedValue(mockProgressUpdate);
      const result = await service.findOne(mockProgressUpdate._id.toString());
      expect(result).toBeDefined();
      expect(mockProgressUpdateModel.findById).toHaveBeenCalledWith(
        mockProgressUpdate._id.toString(),
      );
    });

    it('should throw NotFoundException if update not found', async () => {
      mockProgressUpdateModel.findById.mockResolvedValue(null);
      await expect(service.findOne('invalidId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

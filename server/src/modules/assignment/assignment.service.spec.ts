import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentService } from './assignment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Assignment } from '../../database/schemas/assignment.schema';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { AssignmentStatus } from './interfaces/assignment.interface';

describe('AssignmentService', () => {
  let service: AssignmentService;

  const mockAssignment = {
    _id: new Types.ObjectId(),
    report_id: new Types.ObjectId(),
    worker_id: new Types.ObjectId(),
    assigned_by: new Types.ObjectId(),
    status: AssignmentStatus.ASSIGNED,
    is_active: true,
    is_deleted: false,
  };

  const mockAssignmentModel: any = jest.fn().mockImplementation(() => ({
    ...mockAssignment,
    save: jest.fn().mockResolvedValue(mockAssignment),
  }));

  Object.assign(mockAssignmentModel, {
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      then: jest.fn().mockImplementation((resolve) => resolve([mockAssignment])),
    }),
    countDocuments: jest.fn().mockResolvedValue(1),
    findById: jest.fn().mockResolvedValue(mockAssignment),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockAssignment),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignmentService,
        {
          provide: getModelToken(Assignment.name),
          useValue: mockAssignmentModel,
        },
      ],
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an assignment successfully', async () => {
      const dto = {
        report_id: mockAssignment.report_id,
        worker_id: mockAssignment.worker_id,
        assigned_by: mockAssignment.assigned_by,
      };

      const result = await service.create(dto);
      expect(result).toBeDefined();
      expect(result.status).toEqual(AssignmentStatus.ASSIGNED);
    });
  });

  describe('findAll', () => {
    it('should return paginated assignments', async () => {
      const result = await service.findAll({});
      expect(result.data).toBeInstanceOf(Array);
      expect(mockAssignmentModel.find).toHaveBeenCalledWith({
        is_deleted: { $ne: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return an assignment', async () => {
      mockAssignmentModel.findById.mockResolvedValue(mockAssignment);
      const result = await service.findOne(mockAssignment._id.toString());
      expect(result).toBeDefined();
      expect(mockAssignmentModel.findById).toHaveBeenCalledWith(mockAssignment._id.toString());
    });

    it('should throw NotFoundException if assignment not found', async () => {
      mockAssignmentModel.findById.mockResolvedValue(null);
      await expect(service.findOne('invalidId')).rejects.toThrow(NotFoundException);
    });
  });
});

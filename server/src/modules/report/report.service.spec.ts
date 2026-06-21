import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReportService } from './report.service';
import { Report } from '../../database/schemas/report.schema';
import { Location } from '../../database/schemas/location.schema';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('ReportService', () => {
  let service: ReportService;

  const mockReport = {
    _id: new Types.ObjectId().toString(),
    title: 'Test Report',
    description: 'Test Description',
    save: jest.fn().mockResolvedValue(this),
  };

  const mockReportModel = {
    new: jest.fn().mockResolvedValue(mockReport),
    constructor: jest.fn().mockResolvedValue(mockReport),
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      then: jest.fn().mockImplementation(function (resolve) {
        return resolve([mockReport]);
      }),
    }),
    countDocuments: jest.fn().mockResolvedValue(1),
    findById: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      then: jest.fn().mockImplementation(function (resolve) {
        return resolve(mockReport);
      }),
    }),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      then: jest.fn().mockImplementation(function (resolve) {
        return resolve(mockReport);
      }),
    }),
  };

  const mockLocationModel = {
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: new Types.ObjectId() }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: getModelToken(Report.name),
          useValue: mockReportModel,
        },
        {
          provide: getModelToken(Location.name),
          useValue: mockLocationModel,
        },
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a paginated result of reports', async () => {
      const result = await service.findAll({});
      expect(result.data).toBeInstanceOf(Array);
      expect(mockReportModel.find).toHaveBeenCalledWith({
        is_deleted: { $ne: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single report', async () => {
      const result = await service.findOne(mockReport._id);
      expect(result).toBeDefined();
      expect(mockReportModel.findById).toHaveBeenCalledWith(mockReport._id);
    });

    it('should throw NotFoundException if report not found', async () => {
      mockReportModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        then: jest.fn().mockImplementation(function (resolve) {
          return resolve(null);
        }),
      });

      await expect(service.findOne('invalidId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

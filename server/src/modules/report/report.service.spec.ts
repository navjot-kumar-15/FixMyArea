import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReportService } from './report.service';
import { Report } from '../../database/schemas/report.schema';
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
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: getModelToken(Report.name),
          useValue: mockReportModel,
        },
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const reports = [mockReport];
      mockReportModel.find.mockResolvedValue(reports);

      const result = await service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(mockReportModel.find).toHaveBeenCalledWith({ isDeleted: { $ne: true } });
    });
  });

  describe('findOne', () => {
    it('should return a single report', async () => {
      mockReportModel.findById.mockResolvedValue(mockReport);

      const result = await service.findOne(mockReport._id);
      expect(result).toBeDefined();
      expect(mockReportModel.findById).toHaveBeenCalledWith(mockReport._id);
    });

    it('should throw NotFoundException if report not found', async () => {
      mockReportModel.findById.mockResolvedValue(null);

      await expect(service.findOne('invalidId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

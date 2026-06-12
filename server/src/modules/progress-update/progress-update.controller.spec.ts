import { Test, TestingModule } from '@nestjs/testing';
import { ProgressUpdateController } from './progress-update.controller';
import { ProgressUpdateService } from './progress-update.service';

describe('ProgressUpdateController', () => {
  let controller: ProgressUpdateController;

  const mockProgressUpdateService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressUpdateController],
      providers: [
        {
          provide: ProgressUpdateService,
          useValue: mockProgressUpdateService,
        },
      ],
    }).compile();

    controller = module.get<ProgressUpdateController>(ProgressUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

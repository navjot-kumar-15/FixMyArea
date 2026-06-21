import { Test, TestingModule } from '@nestjs/testing';
import { MediaService, MEDIA_PROVIDER_TOKEN } from './media.service';
import { IMediaProvider } from './interfaces/media-provider.interface';

describe('MediaService', () => {
  let service: MediaService;
  let mockProvider: jest.Mocked<IMediaProvider>;

  beforeEach(async () => {
    mockProvider = {
      uploadFile: jest.fn().mockResolvedValue({
        url: 'https://example.com/image.jpg',
        public_id: 'some-id',
      }),
      deleteFile: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: MEDIA_PROVIDER_TOKEN,
          useValue: mockProvider,
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadMedia', () => {
    it('should delegate upload to the injected media provider', async () => {
      const mockFile = {
        originalname: 'test.png',
        buffer: Buffer.from(''),
        mimetype: 'image/png',
      } as Express.Multer.File;

      const result = await service.uploadMedia(mockFile, 'test-folder');

      expect(mockProvider.uploadFile).toHaveBeenCalledWith(mockFile, 'test-folder');
      expect(result).toEqual({
        url: 'https://example.com/image.jpg',
        public_id: 'some-id',
      });
    });
  });

  describe('deleteMedia', () => {
    it('should delegate delete to the injected media provider', async () => {
      const result = await service.deleteMedia('some-id');

      expect(mockProvider.deleteFile).toHaveBeenCalledWith('some-id');
      expect(result).toBe(true);
    });
  });
});

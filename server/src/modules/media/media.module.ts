import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService, MEDIA_PROVIDER_TOKEN } from './media.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { AwsS3Provider } from './providers/aws-s3.provider';

@Module({
  controllers: [MediaController],
  providers: [
    MediaService,
    {
      provide: MEDIA_PROVIDER_TOKEN,
      useFactory: () => {
        // Read from environment variable (default to Cloudinary if not set)
        const provider = process.env.ACTIVE_STORAGE_PROVIDER || 'CLOUDINARY';
        
        if (provider.toUpperCase() === 'AWS') {
          return new AwsS3Provider();
        }
        
        // Return Cloudinary by default
        return new CloudinaryProvider();
      },
    },
  ],
  exports: [MediaService],
})
export class MediaModule {}

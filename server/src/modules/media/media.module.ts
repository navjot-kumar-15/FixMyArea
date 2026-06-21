import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MediaController } from './media.controller';
import { MediaService, MEDIA_PROVIDER_TOKEN } from './media.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { AwsS3Provider } from './providers/aws-s3.provider';

@Module({
  controllers: [MediaController],
  providers: [
    MediaService,
    CloudinaryProvider,
    AwsS3Provider,
    {
      provide: MEDIA_PROVIDER_TOKEN,
      useFactory: (
        configService: ConfigService,
        cloudinaryProvider: CloudinaryProvider,
        awsS3Provider: AwsS3Provider,
      ) => {
        const provider = configService.get<string>('media.provider') || 'CLOUDINARY';

        if (provider.toUpperCase() === 'AWS') {
          return awsS3Provider;
        }

        return cloudinaryProvider;
      },
      inject: [ConfigService, CloudinaryProvider, AwsS3Provider],
    },
  ],
  exports: [MediaService],
})
export class MediaModule {}

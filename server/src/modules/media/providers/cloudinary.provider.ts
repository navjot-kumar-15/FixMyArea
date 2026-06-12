import { Injectable, Logger } from '@nestjs/common';
import {
  IMediaProvider,
  UploadResult,
} from '../interfaces/media-provider.interface';

@Injectable()
export class CloudinaryProvider implements IMediaProvider {
  private readonly logger = new Logger(CloudinaryProvider.name);

  constructor() {
    this.logger.log('Cloudinary Provider initialized');
    // TODO: Initialize cloudinary SDK with environment variables here:
    // v2.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, ... });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<UploadResult> {
    this.logger.debug(
      `Mocking upload of ${file.originalname} to Cloudinary folder: ${folder || 'default'}`,
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Implement actual v2.uploader.upload_stream logic here

    return {
      url: `https://res.cloudinary.com/mock-cloud/image/upload/v1/${folder || 'default'}/mock-id-${Date.now()}.jpg`,
      public_id: `mock-cloudinary-id-${Date.now()}`,
    };
  }

  async deleteFile(public_id: string): Promise<boolean> {
    this.logger.debug(`Mocking deletion of ${public_id} from Cloudinary`);
    // TODO: Implement v2.uploader.destroy(publicId)
    return true;
  }
}

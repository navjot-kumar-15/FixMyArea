import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
  IMediaProvider,
  UploadResult,
} from '../interfaces/media-provider.interface';

@Injectable()
export class CloudinaryProvider implements IMediaProvider {
  private readonly logger = new Logger(CloudinaryProvider.name);
  private readonly isConfigured: boolean = false;

  constructor(private readonly configService: ConfigService) {
    const cloudName = this.configService.get<string>('media.cloudinary.cloudName');
    const apiKey = this.configService.get<string>('media.cloudinary.apiKey');
    const apiSecret = this.configService.get<string>('media.cloudinary.apiSecret');
    const upload_prefix = this.configService.get<string>('media.cloudinary.uploadPrefix');

    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        upload_prefix: upload_prefix
      });
      this.isConfigured = true;
      this.logger.log('Cloudinary Provider initialized with configuration');
    } else {
      this.logger.warn(
        'Cloudinary credentials incomplete/missing in config. Uploads will be simulated.',
      );
    }
  }

  private async saveToDownloads(file: Express.Multer.File, filename: string): Promise<void> {
    if (!file.buffer) {
      this.logger.warn('No file buffer available to save to downloads');
      return;
    }
    try {
      const downloadsDir = path.join(process.cwd(), 'downloads');
      await fs.mkdir(downloadsDir, { recursive: true });
      const filePath = path.join(downloadsDir, filename);
      await fs.writeFile(filePath, file.buffer);
      this.logger.log(`File saved locally to downloads: ${filePath}`);
    } catch (error) {
      this.logger.error(`Failed to save file to downloads: ${error.message}`);
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<UploadResult> {
    const fileExtension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, fileExtension).replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueFilename = `${baseName}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExtension}`;

    if (!this.isConfigured) {
      this.logger.debug(
        `Mocking upload of ${file.originalname} as ${uniqueFilename} to Cloudinary folder: ${folder || 'default'}`,
      );


      const result = {
        url: `https://res.cloudinary.com/mock-cloud/image/upload/v1/${folder || 'default'}/${uniqueFilename}`,
        public_id: `mock-cloudinary-${uniqueFilename}`,
      };

      await this.saveToDownloads(file, uniqueFilename);
      return result;
    }

    try {
      const publicId = path.basename(uniqueFilename, fileExtension);
      const result = await new Promise<UploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder || 'default',
            public_id: publicId,
          },
          (error, res) => {
            if (error) {
              this.logger.error(`Cloudinary upload failed: ${error.message}`);
              return reject(error);
            }
            if (!res) {
              return reject(new Error('Cloudinary upload returned empty result'));
            }
            resolve({
              url: res.secure_url,
              public_id: res.public_id,
            });
          },
        );
        uploadStream.end(file.buffer);
      });

      await this.saveToDownloads(file, uniqueFilename);
      return result;
    } catch (error) {
      this.logger.error(`Cloudinary upload error: ${error.message}`);
      throw error;
    }
  }

  async deleteFile(public_id: string): Promise<boolean> {
    if (!this.isConfigured) {
      this.logger.debug(`Mocking deletion of ${public_id} from Cloudinary`);
      return true;
    }

    try {
      const result = await cloudinary.uploader.destroy(public_id);
      return result.result === 'ok';
    } catch (error) {
      this.logger.error(`Cloudinary delete error: ${error.message}`);
      return false;
    }
  }
}

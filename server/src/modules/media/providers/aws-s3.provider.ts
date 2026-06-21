import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
  IMediaProvider,
  UploadResult,
} from '../interfaces/media-provider.interface';

@Injectable()
export class AwsS3Provider implements IMediaProvider {
  private readonly logger = new Logger(AwsS3Provider.name);
  private s3Client: S3Client | null = null;
  private bucketName: string | null = null;

  constructor(private readonly configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('media.aws.accessKeyId');
    const secretAccessKey = this.configService.get<string>('media.aws.secretAccessKey');
    const region = this.configService.get<string>('media.aws.region');
    this.bucketName = this.configService.get<string>('media.aws.bucketName') || null;

    if (accessKeyId && secretAccessKey && region && this.bucketName) {
      this.s3Client = new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.logger.log('AWS S3 Provider initialized with configuration');
    } else {
      this.logger.warn(
        'AWS S3 credentials/bucket incomplete/missing in config. Uploads will be simulated.',
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

    if (!this.s3Client || !this.bucketName) {
      this.logger.debug(
        `Mocking upload of ${file.originalname} as ${uniqueFilename} to AWS S3 bucket/folder: ${folder || 'default'}`,
      );

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = {
        url: `https://mock-bucket.s3.amazonaws.com/${folder || 'default'}/${uniqueFilename}`,
        public_id: `mock-s3-key-${uniqueFilename}`,
      };

      await this.saveToDownloads(file, uniqueFilename);
      return result;
    }

    const key = `${folder || 'default'}/${uniqueFilename}`;

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      const region = this.configService.get<string>('media.aws.region');
      const url = `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`;

      const result = {
        url,
        public_id: key,
      };

      await this.saveToDownloads(file, uniqueFilename);
      return result;
    } catch (error) {
      this.logger.error(`AWS S3 upload error: ${error.message}`);
      throw error;
    }
  }

  async deleteFile(public_id: string): Promise<boolean> {
    if (!this.s3Client || !this.bucketName) {
      this.logger.debug(`Mocking deletion of ${public_id} from AWS S3`);
      return true;
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: public_id,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error) {
      this.logger.error(`AWS S3 delete error: ${error.message}`);
      return false;
    }
  }
}

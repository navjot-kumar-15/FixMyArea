import { Injectable, Inject } from '@nestjs/common';
import type { IMediaProvider } from './interfaces/media-provider.interface';
import { UploadResult } from './interfaces/media-provider.interface';

export const MEDIA_PROVIDER_TOKEN = 'MEDIA_PROVIDER';

@Injectable()
export class MediaService {
  constructor(
    @Inject(MEDIA_PROVIDER_TOKEN)
    private readonly mediaProvider: IMediaProvider,
  ) {}

  /**
   * Uploads media delegating to the injected strategy (AWS/Cloudinary)
   * @param file The file to upload
   * @param folder The target folder
   */
  async uploadMedia(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<UploadResult> {
    return this.mediaProvider.uploadFile(file, folder);
  }

  /**
   * Uploads multiple media files concurrently delegating to the injected strategy
   * @param files Array of files to upload
   * @param folder The target folder
   */
  async uploadMultipleMedia(
    files: Express.Multer.File[],
    folder?: string,
  ): Promise<UploadResult[]> {
    return Promise.all(files.map((file) => this.mediaProvider.uploadFile(file, folder)));
  }

  /**
   * Deletes media delegating to the injected strategy
   * @param public_id The ID of the file to delete
   */
  async deleteMedia(public_id: string): Promise<boolean> {
    return this.mediaProvider.deleteFile(public_id);
  }
}

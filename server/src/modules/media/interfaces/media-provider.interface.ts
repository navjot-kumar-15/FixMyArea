export interface UploadResult {
  url: string;
  public_id: string;
}

export interface IMediaProvider {
  /**
   * Uploads a file to the configured storage provider.
   * @param file The file object intercepted by Multer
   * @param folder Optional folder path within the storage bucket/cloud
   */
  uploadFile(file: Express.Multer.File, folder?: string): Promise<UploadResult>;

  /**
   * Deletes a file from the configured storage provider.
   * @param public_id The unique identifier of the file to delete
   */
  deleteFile(public_id: string): Promise<boolean>;
}

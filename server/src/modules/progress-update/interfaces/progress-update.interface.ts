export interface IProgressImage {
  url: string;
  public_id?: string;
}

export interface IProgressUpdate {
  id: string;
  report_id: string;
  worker_id: string;
  note: string;
  progress_percentage: number;
  images?: IProgressImage[];
  is_final_update: boolean;
  is_verified: boolean;
  verified_by?: string;
  verified_at?: Date;
  is_deleted: boolean;
  deleted_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

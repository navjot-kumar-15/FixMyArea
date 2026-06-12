import { IProgressUpdate } from '../interfaces/progress-update.interface';
import { ProgressUpdateResponseDto } from '../dto/progress-update-response.dto';

export class ProgressUpdateMapper {
  static toDomain(raw: any): IProgressUpdate | null {
    if (!raw) return null;

    return {
      id: raw.id ? raw.id : raw._id ? raw._id.toString() : undefined,
      report_id: raw.report_id ? raw.report_id.toString() : undefined,
      worker_id: raw.worker_id ? raw.worker_id.toString() : undefined,
      note: raw.note,
      progress_percentage: raw.progress_percentage,
      images: raw.images ? raw.images.map((img: any) => ({
        url: img.url,
        public_id: img.public_id,
      })) : [],
      is_final_update: raw.is_final_update,
      is_verified: raw.is_verified,
      verified_by: raw.verified_by ? raw.verified_by.toString() : undefined,
      verified_at: raw.verified_at,
      is_deleted: raw.is_deleted,
      deleted_at: raw.deleted_at,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomainList(rawList: any[]): IProgressUpdate[] {
    if (!rawList) return [];
    return rawList
      .map((raw) => this.toDomain(raw))
      .filter((update): update is IProgressUpdate => update !== null);
  }

  static toResponse(domain: IProgressUpdate | null): ProgressUpdateResponseDto | null {
    if (!domain) return null;
    return {
      id: domain.id,
      report_id: domain.report_id,
      worker_id: domain.worker_id,
      note: domain.note,
      progress_percentage: domain.progress_percentage,
      images: domain.images ? domain.images.map((img: any) => ({
        url: img.url,
        public_id: img.public_id,
      })) : [],
      is_final_update: domain.is_final_update,
      is_verified: domain.is_verified,
      verified_by: domain.verified_by,
      verified_at: domain.verified_at,
      is_deleted: domain.is_deleted,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toResponseList(domainList: IProgressUpdate[]): ProgressUpdateResponseDto[] {
    if (!domainList) return [];
    return domainList
      .map((domain) => this.toResponse(domain))
      .filter((dto): dto is ProgressUpdateResponseDto => dto !== null);
  }
}

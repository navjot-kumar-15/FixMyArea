import { IReport } from '../interfaces/report.interface';
import { ReportResponseDto } from '../dto/report-response.dto';

export class ReportMapper {
  /**
   * Maps a Mongoose document or raw database object into a plain domain interface.
   * This ensures the rest of your application doesn't leak MongoDB specific properties
   * like __v or complex Document methods.
   */
  static toDomain(raw: any): IReport | null {
    if (!raw) return null;

    return {
      id: raw.id ? raw.id : raw._id ? raw._id.toString() : undefined,
      title: raw.title,
      description: raw.description,
      category: raw.category
        ? raw.category._id
          ? raw.category
          : raw.category.toString()
        : undefined,
      images: raw.images,
      location: raw.location,
      address: raw.address,
      city: raw.city,
      state: raw.state,
      country: raw.country,
      pincode: raw.pincode,
      status: raw.status,
      priority: raw.priority,
      severity_score: raw.severity_score,
      created_by: raw.created_by ? raw.created_by.toString() : undefined,
      assigned_worker: raw.assigned_worker
        ? raw.assigned_worker.toString()
        : undefined,
      duplicate_of: raw.duplicate_of ? raw.duplicate_of.toString() : undefined,
      upvotes_count: raw.upvotes_count,
      downvotes_count: raw.downvotes_count,
      comments_count: raw.comments_count,
      views_count: raw.views_count,
      supporters_count: raw.supporters_count,
      is_verified: raw.is_verified,
      is_resolved: raw.is_resolved,
      resolved_at: raw.resolved_at,
      resolved_by: raw.resolved_by ? raw.resolved_by.toString() : undefined,
      ai_analysis: raw.ai_analysis,
      tags: raw.tags,
      moderation: raw.moderation,
      visibility: raw.visibility,
      is_deleted: raw.is_deleted,
      deleted_at: raw.deleted_at,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  /**
   * Maps an array of Mongoose documents to an array of plain domain interfaces.
   */
  static toDomainList(rawList: any[]): IReport[] {
    if (!rawList) return [];
    return rawList
      .map((raw) => this.toDomain(raw))
      .filter((report): report is IReport => report !== null);
  }

  /**
   * Maps a domain object to a plain response object.
   */
  static toResponse(domain: IReport | null): ReportResponseDto | null {
    if (!domain) return null;

    return {
      id: domain.id,
      title: domain.title,
      description: domain.description,
      category: domain.category,
      images: domain.images
        ? domain.images.map((img: any) => ({
            url: img.url,
            public_id: img.public_id,
          }))
        : [],
      location: domain.location
        ? {
            type: domain.location.type,
            coordinates: domain.location.coordinates,
          }
        : { type: 'Point', coordinates: [] },
      address: domain.address,
      city: domain.city,
      state: domain.state,
      country: domain.country,
      pincode: domain.pincode,
      status: domain.status,
      priority: domain.priority,
      severity_score: domain.severity_score,
      created_by: domain.created_by,
      assigned_worker: domain.assigned_worker,
      duplicate_of: domain.duplicate_of,
      upvotes_count: domain.upvotes_count,
      downvotes_count: domain.downvotes_count,
      comments_count: domain.comments_count,
      views_count: domain.views_count,
      supporters_count: domain.supporters_count,
      is_verified: domain.is_verified,
      is_resolved: domain.is_resolved,
      resolved_at: domain.resolved_at,
      resolved_by: domain.resolved_by,
      ai_analysis: domain.ai_analysis
        ? {
            detected_category: domain.ai_analysis.detected_category,
            confidence: domain.ai_analysis.confidence,
            suggested_priority: domain.ai_analysis.suggested_priority,
            toxicity_score: domain.ai_analysis.toxicity_score,
          }
        : undefined,
      tags: domain.tags || [],
      moderation: domain.moderation
        ? {
            is_flagged: domain.moderation.is_flagged,
            flagged_reason: domain.moderation.flagged_reason,
          }
        : { is_flagged: false },
      visibility: domain.visibility,
      is_deleted: domain.is_deleted,
      deleted_at: domain.deleted_at,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  /**
   * Maps an array of domain objects to an array of response objects.
   */
  static toResponseList(domainList: IReport[]): ReportResponseDto[] {
    if (!domainList) return [];
    return domainList
      .map((domain) => this.toResponse(domain))
      .filter((dto): dto is ReportResponseDto => dto !== null);
  }
}

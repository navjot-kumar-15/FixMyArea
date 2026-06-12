import { IReport } from '../interfaces/report.interface';

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
}

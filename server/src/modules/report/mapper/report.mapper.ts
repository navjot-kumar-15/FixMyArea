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
      category: raw.category ? (raw.category._id ? raw.category : raw.category.toString()) : undefined,
      images: raw.images,
      location: raw.location,
      address: raw.address,
      city: raw.city,
      state: raw.state,
      country: raw.country,
      pincode: raw.pincode,
      status: raw.status,
      priority: raw.priority,
      severityScore: raw.severityScore,
      createdBy: raw.createdBy ? raw.createdBy.toString() : undefined,
      assignedWorker: raw.assignedWorker ? raw.assignedWorker.toString() : undefined,
      duplicateOf: raw.duplicateOf ? raw.duplicateOf.toString() : undefined,
      upvotesCount: raw.upvotesCount,
      downvotesCount: raw.downvotesCount,
      commentsCount: raw.commentsCount,
      viewsCount: raw.viewsCount,
      supportersCount: raw.supportersCount,
      isVerified: raw.isVerified,
      isResolved: raw.isResolved,
      resolvedAt: raw.resolvedAt,
      resolvedBy: raw.resolvedBy ? raw.resolvedBy.toString() : undefined,
      aiAnalysis: raw.aiAnalysis,
      tags: raw.tags,
      moderation: raw.moderation,
      visibility: raw.visibility,
      isDeleted: raw.isDeleted,
      deletedAt: raw.deletedAt,
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

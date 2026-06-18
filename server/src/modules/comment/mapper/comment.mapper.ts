import { IComment } from '../interfaces/comment.interface';
import { CommentResponseDto } from '../dto/comment-response.dto';

export class CommentMapper {
  static toDomain(raw: any): IComment | null {
    if (!raw) return null;

    return {
      id: raw.id ? raw.id : raw._id ? raw._id.toString() : undefined,
      report_id: raw.report_id ? raw.report_id.toString() : undefined,
      user_id: raw.user_id ? raw.user_id.toString() : undefined,
      message: raw.message,
      parent_comment_id: raw.parent_comment_id
        ? raw.parent_comment_id.toString()
        : undefined,
      is_edited: raw.is_edited,
      edited_at: raw.edited_at,
      is_deleted: raw.is_deleted,
      deleted_at: raw.deleted_at,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomainList(rawList: any[]): IComment[] {
    if (!rawList) return [];
    return rawList
      .map((raw) => this.toDomain(raw))
      .filter((comment): comment is IComment => comment !== null);
  }

  static toResponse(domain: IComment | null): CommentResponseDto | null {
    if (!domain) return null;
    return {
      id: domain.id,
      report_id: domain.report_id,
      user_id: domain.user_id,
      message: domain.message,
      parent_comment_id: domain.parent_comment_id,
      is_edited: domain.is_edited,
      edited_at: domain.edited_at,
      is_deleted: domain.is_deleted,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toResponseList(domainList: IComment[]): CommentResponseDto[] {
    if (!domainList) return [];
    return domainList
      .map((domain) => this.toResponse(domain))
      .filter((dto): dto is CommentResponseDto => dto !== null);
  }
}

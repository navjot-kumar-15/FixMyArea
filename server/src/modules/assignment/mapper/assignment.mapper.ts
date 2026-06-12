import { IAssignment } from '../interfaces/assignment.interface';
import { AssignmentResponseDto } from '../dto/assignment-response.dto';

export class AssignmentMapper {
  static toDomain(raw: any): IAssignment | null {
    if (!raw) return null;

    return {
      id: raw.id ? raw.id : raw._id ? raw._id.toString() : undefined,
      report_id: raw.report_id ? raw.report_id.toString() : undefined,
      worker_id: raw.worker_id ? raw.worker_id.toString() : undefined,
      assigned_by: raw.assigned_by ? raw.assigned_by.toString() : undefined,
      status: raw.status,
      note: raw.note,
      assigned_at: raw.assigned_at,
      accepted_at: raw.accepted_at,
      rejected_at: raw.rejected_at,
      completed_at: raw.completed_at,
      rejection_reason: raw.rejection_reason,
      is_active: raw.is_active,
      is_deleted: raw.is_deleted,
      deleted_at: raw.deleted_at,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomainList(rawList: any[]): IAssignment[] {
    if (!rawList) return [];
    return rawList
      .map((raw) => this.toDomain(raw))
      .filter((assignment): assignment is IAssignment => assignment !== null);
  }

  static toResponse(domain: IAssignment | null): AssignmentResponseDto | null {
    if (!domain) return null;
    return {
      id: domain.id,
      report_id: domain.report_id,
      worker_id: domain.worker_id,
      assigned_by: domain.assigned_by,
      status: domain.status,
      note: domain.note,
      assigned_at: domain.assigned_at,
      accepted_at: domain.accepted_at,
      rejected_at: domain.rejected_at,
      completed_at: domain.completed_at,
      rejection_reason: domain.rejection_reason,
      is_active: domain.is_active,
      is_deleted: domain.is_deleted,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toResponseList(domainList: IAssignment[]): AssignmentResponseDto[] {
    if (!domainList) return [];
    return domainList
      .map((domain) => this.toResponse(domain))
      .filter((dto): dto is AssignmentResponseDto => dto !== null);
  }
}

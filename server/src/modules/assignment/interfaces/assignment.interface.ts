export enum AssignmentStatus {
  ASSIGNED = 'assigned',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REASSIGNED = 'reassigned',
}

export interface IAssignment {
  id: string;
  report_id: string;
  worker_id: string;
  assigned_by: string;
  status: AssignmentStatus;
  note?: string;
  assigned_at?: Date;
  accepted_at?: Date;
  rejected_at?: Date;
  completed_at?: Date;
  rejection_reason?: string;
  is_active: boolean;
  is_deleted: boolean;
  deleted_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

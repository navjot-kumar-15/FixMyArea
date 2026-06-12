export interface IComment {
  id: string;
  report_id: string;
  user_id: string;
  message: string;
  parent_comment_id?: string;
  is_edited: boolean;
  edited_at?: Date;
  is_deleted: boolean;
  deleted_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

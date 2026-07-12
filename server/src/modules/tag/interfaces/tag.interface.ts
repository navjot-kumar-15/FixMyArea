export interface ITag {
  id: string;
  name: string;
  description?: string;
  color?: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

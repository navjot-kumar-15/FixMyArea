export interface IRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

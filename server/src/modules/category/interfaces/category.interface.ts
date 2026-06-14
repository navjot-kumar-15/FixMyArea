export interface ICategory {
  id: string;
  name: string;
  description: string;
  department: string;
  icon: string;
  color: string;
  priority_weight: number;
  sla_hours: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

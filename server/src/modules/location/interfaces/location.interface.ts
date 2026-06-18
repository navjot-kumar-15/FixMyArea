import { LocationType } from '../../../database/schemas/location.schema';

export interface ILocation {
  id: string;
  name: string;
  type: LocationType;
  parent_id: string | null;
  is_active: boolean;
  is_serviceable: boolean;
  code?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

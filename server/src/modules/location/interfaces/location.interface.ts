import { LocationType } from '../../../database/schemas/location.schema';

export interface IGeoLocation {
  type: string;
  coordinates: number[];
}

export interface ILocation {
  id: string;
  name: string;
  type: LocationType;
  parent_id: string | null;
  geo_location?: IGeoLocation;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
  is_serviceable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

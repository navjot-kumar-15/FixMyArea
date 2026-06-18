import { ILocation } from '../interfaces/location.interface';
import { LocationResponseDto } from '../dto/location-response.dto';

interface RawLocation {
  id?: any;
  _id?: any;
  name: string;
  type: any;
  parent_id?: any;
  is_active?: boolean;
  is_serviceable?: boolean;
  code?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class LocationMapper {
  static toDomain(raw: RawLocation | null | undefined): ILocation | null {
    if (!raw) return null;

    const id = raw.id ? String(raw.id) : raw._id ? String(raw._id) : '';
    return {
      id,
      name: raw.name,
      type: raw.type,
      parent_id: raw.parent_id ? String(raw.parent_id) : null,
      is_active: raw.is_active ?? true,
      is_serviceable: raw.is_serviceable ?? true,
      code: raw.code,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomainList(rawList: RawLocation[]): ILocation[] {
    if (!rawList) return [];
    return rawList
      .map((raw) => this.toDomain(raw))
      .filter((loc): loc is ILocation => loc !== null);
  }

  static toResponse(domain: ILocation | null): LocationResponseDto | null {
    if (!domain) return null;

    return {
      id: domain.id,
      name: domain.name,
      type: domain.type,
      parent_id: domain.parent_id,
      is_active: domain.is_active,
      is_serviceable: domain.is_serviceable,
      code: domain.code,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toResponseList(domainList: ILocation[]): LocationResponseDto[] {
    if (!domainList) return [];
    return domainList
      .map((domain) => this.toResponse(domain))
      .filter((dto): dto is LocationResponseDto => dto !== null);
  }
}

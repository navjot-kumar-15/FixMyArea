import { IRole } from '../interfaces/role.interface';
import { RoleResponseDto } from '../dto/role-response.dto';

export class RoleMapper {
  static toDomain(raw: any): IRole | null {
    if (!raw) return null;

    return {
      id: raw.id ? raw.id : raw._id ? raw._id.toString() : undefined,
      name: raw.name,
      description: raw.description,
      permissions: raw.permissions || [],
      is_active: raw.is_active,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomainList(rawList: any[]): IRole[] {
    if (!rawList) return [];
    return rawList
      .map((raw) => this.toDomain(raw))
      .filter((role): role is IRole => role !== null);
  }

  static toResponse(domain: IRole | null): RoleResponseDto | null {
    if (!domain) return null;

    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      permissions: domain.permissions,
      is_active: domain.is_active,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toResponseList(domainList: IRole[]): RoleResponseDto[] {
    if (!domainList) return [];
    return domainList
      .map((domain) => this.toResponse(domain))
      .filter((dto): dto is RoleResponseDto => dto !== null);
  }
}

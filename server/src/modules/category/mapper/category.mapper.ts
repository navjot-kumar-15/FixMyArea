import { ICategory } from '../interfaces/category.interface';
import { CategoryResponseDto } from '../dto/category-response.dto';

export class CategoryMapper {
  static toDomain(raw: any): ICategory | null {
    if (!raw) return null;

    return {
      id: raw.id ? raw.id : raw._id ? raw._id.toString() : undefined,
      name: raw.name,
      description: raw.description,
      department: raw.department,
      icon: raw.icon,
      color: raw.color,
      priority_weight: raw.priority_weight,
      sla_hours: raw.sla_hours,
      is_active: raw.is_active,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomainList(rawList: any[]): ICategory[] {
    if (!rawList) return [];
    return rawList
      .map((raw) => this.toDomain(raw))
      .filter((category): category is ICategory => category !== null);
  }

  static toResponse(domain: ICategory | null): CategoryResponseDto | null {
    if (!domain) return null;

    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      department: domain.department,
      icon: domain.icon,
      color: domain.color,
      priority_weight: domain.priority_weight,
      sla_hours: domain.sla_hours,
      is_active: domain.is_active,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toResponseList(domainList: ICategory[]): CategoryResponseDto[] {
    if (!domainList) return [];
    return domainList
      .map((domain) => this.toResponse(domain))
      .filter((dto): dto is CategoryResponseDto => dto !== null);
  }
}

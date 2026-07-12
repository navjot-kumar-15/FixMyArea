import { ITag } from '../interfaces/tag.interface';
import { TagResponseDto } from '../dto/tag-response.dto';

export class TagMapper {
  static toDomain(raw: any): ITag | null {
    if (!raw) return null;

    return {
      id: raw.id ? raw.id : raw._id ? raw._id.toString() : undefined,
      name: raw.name,
      description: raw.description,
      color: raw.color,
      is_active: raw.is_active,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomainList(rawList: any[]): ITag[] {
    if (!rawList) return [];
    return rawList
      .map((raw) => this.toDomain(raw))
      .filter((tag): tag is ITag => tag !== null);
  }

  static toResponse(domain: ITag | null): TagResponseDto | null {
    if (!domain) return null;

    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      color: domain.color || '#34495e',
      is_active: domain.is_active,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toResponseList(domainList: ITag[]): TagResponseDto[] {
    if (!domainList) return [];
    return domainList
      .map((domain) => this.toResponse(domain))
      .filter((dto): dto is TagResponseDto => dto !== null);
  }
}

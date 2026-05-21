import { IUser } from '../interfaces/user.interface';

export class UserMapper {
  /**
   * Maps a Mongoose document or raw database object into a plain domain interface.
   * This ensures the rest of your application doesn't leak MongoDB specific properties
   * like __v or complex Document methods.
   */
  static toDomain(raw: any): IUser | null {
    if (!raw) return null;

    return {
      id: raw.id ? raw.id : raw._id ? raw._id.toString() : undefined,
      full_name: raw.full_name,
      first_name: raw.first_name,
      last_name: raw.last_name,
      profile_picture_url: raw.profile_picture_url,
      email: raw.email,
      phone_number: raw.phone_number,
      role_id: raw.role_id ? raw.role_id.toString() : undefined,
      address_id: raw.address_id ? raw.address_id.toString() : undefined,
      is_banned: raw.is_banned,
      is_blocked_by_admin: raw.is_blocked_by_admin,
      is_deleted: raw.is_deleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  /**
   * Maps an array of Mongoose documents to an array of plain domain interfaces.
   */
  static toDomainList(rawList: any[]): IUser[] {
    if (!rawList) return [];
    return rawList
      .map((raw) => this.toDomain(raw))
      .filter((user): user is IUser => user !== null);
  }
}

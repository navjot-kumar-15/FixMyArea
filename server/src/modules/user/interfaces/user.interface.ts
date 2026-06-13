export interface IUser {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  profile_picture_url: string;
  email: string;
  phone_number: string;
  role_id?: string;
  address_id?: string;
  is_banned: boolean;
  otp?: number;
  otp_expires_at?: Date;
  is_blocked_by_admin: boolean;
  is_deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

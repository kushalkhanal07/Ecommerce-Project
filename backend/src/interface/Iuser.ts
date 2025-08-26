
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  lastLoginAt?: Date | null;
  lastLoginIp?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
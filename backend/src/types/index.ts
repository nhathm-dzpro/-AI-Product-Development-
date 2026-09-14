export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}

export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  token: string;
  user: AuthUser;
}

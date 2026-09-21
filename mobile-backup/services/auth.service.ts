import { api } from './api';
import type { User } from '../types';

interface AuthResponse {
  token: string;
  user: User;
}

// Foundation stubs: backend not required yet. Real calls land here in Phase 2.
export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    return res.data;
  },
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/register', { name, email, password });
    return res.data;
  },
  async me(): Promise<User> {
    const res = await api.get<User>('/auth/me');
    return res.data;
  },
};

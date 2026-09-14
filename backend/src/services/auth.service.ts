import { prisma } from '../config/database.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';
import type { AuthTokens, AuthUser } from '../types/index.js';

function toAuthUser(row: { id: string; name: string; email: string; role: string }): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role as AuthUser['role'],
  };
}

export class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const authService = {
  async register(name: string, email: string, password: string): Promise<AuthTokens> {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new HttpError(409, 'Email already in use');

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({ data: { name, email, passwordHash } });
    const authUser = toAuthUser(user);
    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    return { token, user: authUser };
  },

  async login(email: string, password: string): Promise<AuthTokens> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpError(401, 'Invalid credentials');

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) throw new HttpError(401, 'Invalid credentials');

    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    return { token, user: toAuthUser(user) };
  },

  async me(userId: string): Promise<AuthUser> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new HttpError(404, 'User not found');
    return toAuthUser(user);
  },
};

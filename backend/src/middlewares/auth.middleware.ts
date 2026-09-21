import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.js';

export interface AuthedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export function authMiddleware(req: AuthedRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }
  try {
    const payload = verifyToken(header.slice(7));
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

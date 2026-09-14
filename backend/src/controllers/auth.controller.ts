import type { Response } from 'express';
import { authService } from '../services/auth.service.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ok } from '../utils/response.js';
import type { AuthedRequest } from '../middlewares/auth.middleware.js';

export const register = asyncHandler(async (req, res: Response) => {
  const { name, email, password } = req.body as { name: string; email: string; password: string };
  const data = await authService.register(name, email, password);
  res.status(201).json(ok(data));
});

export const login = asyncHandler(async (req, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const data = await authService.login(email, password);
  res.json(ok(data));
});

export const me = asyncHandler(async (req: AuthedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }
  const data = await authService.me(req.user.id);
  res.json(ok(data));
});

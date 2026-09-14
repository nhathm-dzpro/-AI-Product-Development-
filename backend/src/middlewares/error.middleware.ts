import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  void _next;
  const status = (err as Error & { statusCode?: number }).statusCode ?? 500;
  const message = status === 500 ? 'Something went wrong' : err.message;
  if (env.nodeEnv !== 'production' && err.stack !== undefined) {
    res.status(status).json({ success: false, message, stack: err.stack });
    return;
  }
  res.status(status).json({ success: false, message });
}

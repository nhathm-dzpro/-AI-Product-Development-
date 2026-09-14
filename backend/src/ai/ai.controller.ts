import type { Request, Response } from 'express';

export function aiAsk(_req: Request, res: Response): void {
  res.status(501).json({ success: false, message: 'AI not implemented in foundation phase' });
}

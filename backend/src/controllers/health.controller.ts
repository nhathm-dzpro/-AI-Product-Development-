import type { Request, Response } from 'express';

export function health(req: Request, res: Response): void {
  void req;
  res.json({ success: true, message: 'ALNrestaurant API is running' });
}

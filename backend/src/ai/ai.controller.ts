import type { Request, Response } from 'express';
import { processQuestion } from './ai.service.js';

export function aiStatus(_req: Request, res: Response): void {
  res.json({ success: true, message: 'AI Restaurant Copilot is coming soon' });
}

export async function aiQuery(req: Request, res: Response): Promise<void> {
  const question = typeof req.body?.question === 'string' ? req.body.question : '';
  const result = await processQuestion(question);
  res.json(result);
}

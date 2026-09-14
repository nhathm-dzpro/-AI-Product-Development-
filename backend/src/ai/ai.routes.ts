import { Router } from 'express';

export const aiRoutes = Router();

aiRoutes.get('/', (_req, res) => {
  res.json({ success: true, data: null, message: 'AI foundation only (no LLM call)' });
});

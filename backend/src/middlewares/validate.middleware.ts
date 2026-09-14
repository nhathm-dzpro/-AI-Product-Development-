import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
    if (!result.success) {
      res.status(400).json({ success: false, message: result.error.issues[0]?.message ?? 'Invalid input' });
      return;
    }
    next();
  };
}

import { Router } from 'express';

// Skeleton route factory: keeps every module mounted without CRUD.
// Usage: skeleton('products') -> GET / returns placeholder.
export function skeleton(module: string): Router {
  const r = Router();
  r.get('/', (_req, res) => {
    res.json({ success: true, data: [], message: `${module}: foundation only (CRUD in later phase)` });
  });
  return r;
}

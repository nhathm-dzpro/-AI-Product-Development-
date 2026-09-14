import cors from 'cors';
import express from 'express';
import { aiRoutes } from './ai/ai.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import { authRoutes } from './routes/auth.routes.js';
import { healthRoutes } from './routes/health.routes.js';
import { skeleton } from './routes/skeleton.routes.js';

export function createApp(): express.Express {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.use('/api/health', healthRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/ai', aiRoutes);

  // Skeleton modules — no CRUD in foundation phase.
  const modules = [
    'users',
    'categories',
    'products',
    'ingredients',
    'recipes',
    'orders',
    'inventory',
    'suppliers',
    'expenses',
    'dashboard',
    'analytics',
  ] as const;
  for (const m of modules) app.use(`/api/${m}`, skeleton(m));

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}

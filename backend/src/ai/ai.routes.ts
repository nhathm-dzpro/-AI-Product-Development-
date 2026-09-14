import { Router } from 'express';
import { aiQuery, aiStatus } from './ai.controller.js';

export const aiRoutes = Router();

aiRoutes.get('/', aiStatus);
aiRoutes.post('/query', aiQuery);

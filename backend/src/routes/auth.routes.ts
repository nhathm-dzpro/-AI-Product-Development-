import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';

export const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);
authRoutes.get('/me', authMiddleware, authController.me);

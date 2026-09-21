import type { ApiError, ApiSuccess } from '../types/index.js';

export function ok<T>(data: T): ApiSuccess<T> {
  return { success: true, data };
}

export function fail(message: string): ApiError {
  return { success: false, message };
}

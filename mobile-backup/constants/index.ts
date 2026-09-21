export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000/api';

export const ROUTES = {
  login: '/(auth)/login',
  home: '/(tabs)',
} as const;

export const ORDER_FILTERS = ['All', 'Pending', 'Completed', 'Cancelled'] as const;

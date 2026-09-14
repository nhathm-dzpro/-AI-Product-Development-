import type { Category, Expense, Ingredient, Order, Product, User } from '../types';

export const MOCK_USER: User = {
  id: 'u-1',
  name: 'Demo Manager',
  email: 'manager@aln.local',
  role: 'MANAGER',
  createdAt: new Date().toISOString(),
};

export const MOCK_CATEGORIES: Category[] = [
  { id: 'c-1', name: 'Main' },
  { id: 'c-2', name: 'Drinks' },
  { id: 'c-3', name: 'Dessert' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p-1', name: 'Pho Bo', price: 55000, cost: 32000, isAvailable: true, categoryId: 'c-1' },
  { id: 'p-2', name: 'Bun Cha', price: 45000, cost: 26000, isAvailable: true, categoryId: 'c-1' },
  { id: 'p-3', name: 'Tra Da', price: 10000, cost: 2000, isAvailable: true, categoryId: 'c-2' },
  { id: 'p-4', name: 'Che Thai', price: 25000, cost: 12000, isAvailable: false, categoryId: 'c-3' },
];

export const MOCK_INGREDIENTS: Ingredient[] = [
  { id: 'i-1', name: 'Beef', unit: 'kg', stockQty: 12, lowStockThreshold: 5 },
  { id: 'i-2', name: 'Rice noodles', unit: 'kg', stockQty: 3, lowStockThreshold: 5 },
  { id: 'i-3', name: 'Herbs', unit: 'kg', stockQty: 1.5, lowStockThreshold: 2 },
];

export const MOCK_ORDERS: Order[] = [];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 'e-1',
    title: 'Vegetables',
    amount: 850000,
    category: 'Food',
    date: new Date().toISOString(),
    createdById: 'u-1',
  },
];

export const OVERVIEW_MOCK = { revenue: 0, orders: 0, expenses: 0, profit: 0 };

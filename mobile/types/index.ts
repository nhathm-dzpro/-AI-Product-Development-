// ALNrestaurant — domain types (PRD §8). Foundation only, no business logic.
export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  cost?: number;
  imageUrl?: string;
  isAvailable: boolean;
  categoryId: string;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  stockQty: number;
  lowStockThreshold: number;
  supplierId?: string;
}

export interface Recipe {
  productId: string;
  ingredientId: string;
  quantity: number;
  unit: string;
}

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface OrderItem {
  orderId: string;
  productId: string;
  productName?: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  code: string;
  status: OrderStatus;
  total: number;
  createdById: string;
  createdAt: string;
  items?: OrderItem[];
}

export type InventoryTxType = 'IN' | 'OUT' | 'ADJUST';

export interface InventoryTransaction {
  id: string;
  ingredientId: string;
  type: InventoryTxType;
  qty: number;
  reason?: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  createdById: string;
}

export interface Supplier {
  id: string;
  name: string;
  phone?: string;
  address?: string;
}

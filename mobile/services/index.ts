import { MOCK_INGREDIENTS, MOCK_ORDERS, MOCK_PRODUCTS } from '../constants/mock';

// Read-only mock services so screens render without a backend.
export const productService = {
  async list() {
    return MOCK_PRODUCTS;
  },
};

export const orderService = {
  async list() {
    return MOCK_ORDERS;
  },
};

export const inventoryService = {
  async list() {
    return MOCK_INGREDIENTS;
  },
};

export const analyticsService = {
  async overview() {
    return { revenue: 0, profit: 0, expenses: 0 };
  },
};

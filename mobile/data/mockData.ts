export type OrderStatus = 'pending' | 'preparing' | 'completed' | 'cancelled';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  createdAt: string;
  customerName?: string;
  note?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  supplier: string;
  price: number;
  status: StockStatus;
  lastUpdated: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
  description: string;
  soldToday: number;
}

export interface RevenueData {
  day: string;
  revenue: number;
  expenses: number;
  orders: number;
}

export const revenueData: RevenueData[] = [
  { day: 'T2', revenue: 4200000, expenses: 1800000, orders: 42 },
  { day: 'T3', revenue: 3800000, expenses: 1600000, orders: 38 },
  { day: 'T4', revenue: 5100000, expenses: 2100000, orders: 51 },
  { day: 'T5', revenue: 4700000, expenses: 1950000, orders: 47 },
  { day: 'T6', revenue: 6300000, expenses: 2500000, orders: 63 },
  { day: 'T7', revenue: 7800000, expenses: 3100000, orders: 78 },
  { day: 'CN', revenue: 8200000, expenses: 3300000, orders: 82 },
];

export const orders: Order[] = [
  {
    id: 'DH001',
    tableNumber: 5,
    customerName: 'Nguyễn Văn An',
    items: [
      { name: 'Phở Bò Tái', quantity: 2, price: 75000 },
      { name: 'Gỏi Cuốn Tôm', quantity: 1, price: 55000 },
      { name: 'Trà Đá', quantity: 2, price: 10000 },
    ],
    status: 'preparing',
    total: 225000,
    paymentMethod: 'cash',
    createdAt: '2024-01-15T10:30:00',
    note: 'Không hành, ít ớt',
  },
  {
    id: 'DH002',
    tableNumber: 3,
    customerName: 'Trần Thị Bích',
    items: [
      { name: 'Bún Bò Huế', quantity: 3, price: 80000 },
      { name: 'Chả Giò', quantity: 2, price: 45000 },
    ],
    status: 'pending',
    total: 330000,
    paymentMethod: 'transfer',
    createdAt: '2024-01-15T10:45:00',
  },
  {
    id: 'DH003',
    tableNumber: 8,
    customerName: 'Lê Minh Tú',
    items: [
      { name: 'Cơm Gà Hội An', quantity: 4, price: 85000 },
      { name: 'Canh Chua Cá', quantity: 1, price: 65000 },
      { name: 'Nước Ép Cam', quantity: 4, price: 35000 },
    ],
    status: 'completed',
    total: 545000,
    paymentMethod: 'card',
    createdAt: '2024-01-15T09:15:00',
  },
  {
    id: 'DH004',
    tableNumber: 1,
    customerName: 'Phạm Đức Hùng',
    items: [
      { name: 'Bánh Xèo', quantity: 2, price: 70000 },
      { name: 'Nem Rán', quantity: 3, price: 50000 },
    ],
    status: 'completed',
    total: 290000,
    paymentMethod: 'cash',
    createdAt: '2024-01-15T08:30:00',
  },
  {
    id: 'DH005',
    tableNumber: 12,
    customerName: 'Võ Thị Lan',
    items: [
      { name: 'Lẩu Thái Hải Sản', quantity: 1, price: 350000 },
      { name: 'Rau Nhúng Lẩu', quantity: 1, price: 45000 },
      { name: 'Bún Tươi', quantity: 2, price: 20000 },
    ],
    status: 'cancelled',
    total: 435000,
    paymentMethod: 'card',
    createdAt: '2024-01-15T11:00:00',
    note: 'Khách huỷ đơn',
  },
  {
    id: 'DH006',
    tableNumber: 7,
    customerName: 'Hoàng Văn Nam',
    items: [
      { name: 'Bánh Mì Thịt Nướng', quantity: 5, price: 45000 },
      { name: 'Cà Phê Sữa Đá', quantity: 5, price: 35000 },
    ],
    status: 'preparing',
    total: 400000,
    paymentMethod: 'cash',
    createdAt: '2024-01-15T11:20:00',
  },
];

export const inventoryItems: InventoryItem[] = [
  {
    id: 'NL001',
    name: 'Thịt bò',
    category: 'Thịt & Hải sản',
    quantity: 8,
    unit: 'kg',
    minStock: 10,
    supplier: 'Công ty Thực phẩm Sạch Hà Nội',
    price: 280000,
    status: 'low_stock',
    lastUpdated: '2024-01-15',
  },
  {
    id: 'NL002',
    name: 'Bánh phở',
    category: 'Bột & Tinh bột',
    quantity: 45,
    unit: 'kg',
    minStock: 20,
    supplier: 'Cơ sở Bánh Phở Hùng',
    price: 25000,
    status: 'in_stock',
    lastUpdated: '2024-01-15',
  },
  {
    id: 'NL003',
    name: 'Tôm tươi',
    category: 'Thịt & Hải sản',
    quantity: 3,
    unit: 'kg',
    minStock: 8,
    supplier: 'Vựa Hải Sản Biển Đông',
    price: 350000,
    status: 'low_stock',
    lastUpdated: '2024-01-14',
  },
  {
    id: 'NL004',
    name: 'Rau muống',
    category: 'Rau củ',
    quantity: 0,
    unit: 'bó',
    minStock: 10,
    supplier: 'Vườn Rau Sạch Đà Lạt',
    price: 8000,
    status: 'out_of_stock',
    lastUpdated: '2024-01-14',
  },
  {
    id: 'NL005',
    name: 'Cà chua',
    category: 'Rau củ',
    quantity: 25,
    unit: 'kg',
    minStock: 10,
    supplier: 'Vườn Rau Sạch Đà Lạt',
    price: 35000,
    status: 'in_stock',
    lastUpdated: '2024-01-15',
  },
  {
    id: 'NL006',
    name: 'Nước mắm',
    category: 'Gia vị',
    quantity: 12,
    unit: 'chai',
    minStock: 5,
    supplier: 'Nước Mắm Phú Quốc',
    price: 45000,
    status: 'in_stock',
    lastUpdated: '2024-01-13',
  },
  {
    id: 'NL007',
    name: 'Gà ta',
    category: 'Thịt & Hải sản',
    quantity: 6,
    unit: 'con',
    minStock: 10,
    supplier: 'Trang Trại Gà Sạch Bình Dương',
    price: 150000,
    status: 'low_stock',
    lastUpdated: '2024-01-15',
  },
  {
    id: 'NL008',
    name: 'Dầu ăn',
    category: 'Gia vị',
    quantity: 8,
    unit: 'lít',
    minStock: 5,
    supplier: 'Đại lý Thực Phẩm Miền Nam',
    price: 60000,
    status: 'in_stock',
    lastUpdated: '2024-01-12',
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'MN001',
    name: 'Phở Bò Tái Chín',
    category: 'Món Chính',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=200&fit=crop',
    available: true,
    description: 'Phở bò truyền thống với nước dùng ninh xương 12 giờ',
    soldToday: 48,
  },
  {
    id: 'MN002',
    name: 'Bún Bò Huế',
    category: 'Món Chính',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758359?w=300&h=200&fit=crop',
    available: true,
    description: 'Bún bò Huế cay nồng đặc trưng miền Trung',
    soldToday: 35,
  },
  {
    id: 'MN003',
    name: 'Cơm Gà Hội An',
    category: 'Món Chính',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop',
    available: true,
    description: 'Cơm gà vàng thơm phong vị Hội An',
    soldToday: 42,
  },
  {
    id: 'MN004',
    name: 'Gỏi Cuốn Tôm Thịt',
    category: 'Món Khai Vị',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1543826173-70651703c5a4?w=300&h=200&fit=crop',
    available: true,
    description: 'Gỏi cuốn tươi mát với tôm và thịt heo',
    soldToday: 29,
  },
  {
    id: 'MN005',
    name: 'Bánh Xèo',
    category: 'Món Khai Vị',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=200&fit=crop',
    available: true,
    description: 'Bánh xèo giòn rụm nhân tôm thịt giá đỗ',
    soldToday: 21,
  },
  {
    id: 'MN006',
    name: 'Lẩu Thái Hải Sản',
    category: 'Lẩu',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=300&h=200&fit=crop',
    available: true,
    description: 'Lẩu Thái chua cay với hải sản tươi sống',
    soldToday: 15,
  },
  {
    id: 'MN007',
    name: 'Cà Phê Sữa Đá',
    category: 'Đồ Uống',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop',
    available: true,
    description: 'Cà phê Việt Nam pha phin truyền thống',
    soldToday: 87,
  },
  {
    id: 'MN008',
    name: 'Nước Ép Cam Tươi',
    category: 'Đồ Uống',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop',
    available: false,
    description: 'Cam tươi ép nguyên chất không đường',
    soldToday: 0,
  },
];

export const topProducts = [
  { name: 'Cà Phê Sữa Đá', revenue: 3045000, orders: 87 },
  { name: 'Phở Bò Tái Chín', revenue: 3600000, orders: 48 },
  { name: 'Cơm Gà Hội An', revenue: 3570000, orders: 42 },
  { name: 'Bún Bò Huế', revenue: 2800000, orders: 35 },
  { name: 'Gỏi Cuốn Tôm Thịt', revenue: 1595000, orders: 29 },
];

export const aiInsights = [
  {
    id: '1',
    type: 'revenue',
    title: 'Doanh thu tăng 23%',
    description: 'Cuối tuần này doanh thu cao hơn tuần trước 23%. Khách hàng đặt nhiều lẩu hải sản hơn vào tối thứ 7.',
    action: 'Xem Chi Tiết',
    actionType: 'analytics',
    icon: 'trending-up',
    color: '#16A34A',
  },
  {
    id: '2',
    type: 'inventory',
    title: 'Cần nhập thêm nguyên liệu',
    description: 'Tôm tươi, thịt bò và gà ta sắp hết. Cần đặt hàng trước 2 ngày để tránh thiếu hàng cuối tuần.',
    action: 'Xem Kho',
    actionType: 'inventory',
    icon: 'alert-circle',
    color: '#F59E0B',
  },
  {
    id: '3',
    type: 'product',
    title: 'Món bán chạy nhất',
    description: 'Cà Phê Sữa Đá là món bán chạy nhất hôm nay với 87 ly. Cần đảm bảo cà phê nguyên liệu đủ cho cuối tuần.',
    action: 'Xem Menu',
    actionType: 'menu',
    icon: 'star',
    color: '#F97316',
  },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatCompactCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M ₫`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K ₫`;
  }
  return `${amount} ₫`;
};

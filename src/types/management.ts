export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'director' | 'secretary' | 'partner';
  avatar?: string;
  salary?: number;
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  reference: string;
  category: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  unit: string;
  supplier: string;
  lastRestocked: string;
}

export interface Sale {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  margin: number;
  date: string;
  customerName: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Expense {
  id: number;
  category: 'rent' | 'utilities' | 'maintenance' | 'equipment' | 'supplies' | 'transport' | 'software' | 'salary' | 'social_charges' | 'training' | 'legal' | 'exceptional';
  description: string;
  amount: number;
  date: string;
  isConfidential: boolean; // true pour salaires et charges sociales
  addedBy: number;
  receipt?: string;
}

export interface DashboardStats {
  dailySales: number;
  monthlySales: number;
  yearlySales: number;
  dailyOrders: number;
  monthlyOrders: number;
  yearlyOrders: number;
  lowStockProducts: number;
  totalProducts: number;
  totalExpenses: number;
  netProfit: number;
}
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Product, Sale, Expense, DashboardStats } from '../types/management';

interface ManagementContextType {
  users: User[];
  products: Product[];
  sales: Sale[];
  expenses: Expense[];
  dashboardStats: DashboardStats;
  currentUser: User | null;
  
  // User management
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;
  
  // Product management
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  
  // Sales management
  addSale: (sale: Omit<Sale, 'id'>) => void;
  updateSale: (id: number, sale: Partial<Sale>) => void;
  
  // Expense management
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: number, expense: Partial<Expense>) => void;
  deleteExpense: (id: number) => void;
  
  // Access control
  canAccess: (feature: string) => boolean;
  canViewExpense: (expense: Expense) => boolean;
}

const ManagementContext = createContext<ManagementContextType | undefined>(undefined);

export const ManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mock current user - in real app, this would come from auth
  const [currentUser] = useState<User>({
    id: 1,
    name: 'Administrateur',
    email: 'admin@scienceslabs.com',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01'
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Administrateur Système',
      email: 'admin@scienceslabs.com',
      role: 'admin',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Directeur Général',
      email: 'directeur@scienceslabs.com',
      role: 'director',
      salary: 500000,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 3,
      name: 'Secrétaire Principale',
      email: 'secretaire@scienceslabs.com',
      role: 'secretary',
      salary: 150000,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 4,
      name: 'Partenaire Commercial',
      email: 'partenaire@scienceslabs.com',
      role: 'partner',
      isActive: true,
      createdAt: '2024-01-01'
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Bécher 50ml',
      reference: 'BCH-050',
      category: 'Verrerie',
      purchasePrice: 5000,
      salePrice: 8500,
      stock: 25,
      minStock: 10,
      unit: 'pièce',
      supplier: 'Fournisseur A',
      lastRestocked: '2024-01-15'
    },
    {
      id: 2,
      name: 'Microscope Binoculaire',
      reference: 'MIC-BIN-001',
      category: 'Optique',
      purchasePrice: 200000,
      salePrice: 280000,
      stock: 5,
      minStock: 2,
      unit: 'pièce',
      supplier: 'Fournisseur B',
      lastRestocked: '2024-01-10'
    }
  ]);

  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      productId: 1,
      productName: 'Bécher 50ml',
      quantity: 10,
      unitPrice: 8500,
      totalPrice: 85000,
      margin: 35000,
      date: '2024-01-20',
      customerName: 'Lycée Technique',
      paymentMethod: 'Mobile Money',
      status: 'completed'
    }
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      category: 'rent',
      description: 'Loyer mensuel entrepôt',
      amount: 200000,
      date: '2024-01-01',
      isConfidential: false,
      addedBy: 1
    },
    {
      id: 2,
      category: 'utilities',
      description: 'Facture électricité',
      amount: 45000,
      date: '2024-01-15',
      isConfidential: false,
      addedBy: 1
    },
    {
      id: 3,
      category: 'salary',
      description: 'Salaire Directeur',
      amount: 500000,
      date: '2024-01-01',
      isConfidential: true,
      addedBy: 1
    }
  ]);

  const dashboardStats: DashboardStats = {
    dailySales: 125000,
    monthlySales: 2450000,
    yearlySales: 28500000,
    dailyOrders: 5,
    monthlyOrders: 156,
    yearlyOrders: 1847,
    lowStockProducts: 3,
    totalProducts: 247,
    totalExpenses: 1200000,
    netProfit: 1250000
  };

  // Access control functions
  const canAccess = (feature: string): boolean => {
    if (!currentUser) return false;
    
    const permissions = {
      admin: ['all'],
      director: ['dashboard', 'reports', 'expenses_view', 'users_view', 'audit'],
      partner: ['dashboard_limited', 'stock_view', 'sales_view', 'expenses_public'],
      secretary: ['dashboard_basic', 'sales_manage', 'stock_update', 'documents']
    };

    const userPermissions = permissions[currentUser.role];
    return userPermissions.includes('all') || userPermissions.includes(feature);
  };

  const canViewExpense = (expense: Expense): boolean => {
    if (!currentUser) return false;
    
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'director') return true;
    if (currentUser.role === 'partner' && !expense.isConfidential) return true;
    if (currentUser.role === 'secretary') return false;
    
    return false;
  };

  // CRUD operations
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now() };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: number, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...updates } : user));
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => product.id === id ? { ...product, ...updates } : product));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale = { ...sale, id: Date.now() };
    setSales(prev => [...prev, newSale]);
  };

  const updateSale = (id: number, updates: Partial<Sale>) => {
    setSales(prev => prev.map(sale => sale.id === id ? { ...sale, ...updates } : sale));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Date.now() };
    setExpenses(prev => [...prev, newExpense]);
  };

  const updateExpense = (id: number, updates: Partial<Expense>) => {
    setExpenses(prev => prev.map(expense => expense.id === id ? { ...expense, ...updates } : expense));
  };

  const deleteExpense = (id: number) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return (
    <ManagementContext.Provider
      value={{
        users,
        products,
        sales,
        expenses,
        dashboardStats,
        currentUser,
        addUser,
        updateUser,
        deleteUser,
        addProduct,
        updateProduct,
        deleteProduct,
        addSale,
        updateSale,
        addExpense,
        updateExpense,
        deleteExpense,
        canAccess,
        canViewExpense,
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

export const useManagement = () => {
  const context = useContext(ManagementContext);
  if (context === undefined) {
    throw new Error('useManagement must be used within a ManagementProvider');
  }
  return context;
};
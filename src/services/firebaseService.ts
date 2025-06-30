import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Collections names
export const COLLECTIONS = {
  PRODUCTS: 'sl_products',
  USERS: 'sl_users',
  ORDERS: 'sl_orders',
  CATEGORIES: 'sl_categories',
  EXPENSES: 'sl_expenses',
  SALES: 'sl_sales',
  SETTINGS: 'sl_settings'
};

// Generic CRUD operations
export class FirebaseService {
  // Create
  static async create(collectionName: string, data: any) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  // Read all
  static async getAll(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  }

  // Read one
  static async getById(collectionName: string, id: string) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  // Update
  static async update(collectionName: string, id: string, data: any) {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  // Delete
  static async delete(collectionName: string, id: string) {
    try {
      await deleteDoc(doc(db, collectionName, id));
      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  // Query with conditions
  static async query(collectionName: string, conditions: any[] = [], orderByField?: string, limitCount?: number) {
    try {
      let q = collection(db, collectionName);
      
      // Apply where conditions
      conditions.forEach(condition => {
        q = query(q, where(condition.field, condition.operator, condition.value));
      });
      
      // Apply ordering
      if (orderByField) {
        q = query(q, orderBy(orderByField, 'desc'));
      }
      
      // Apply limit
      if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
    }
  }
}

// Specific service methods
export class ProductService extends FirebaseService {
  static async getProducts() {
    return this.getAll(COLLECTIONS.PRODUCTS);
  }

  static async getProductById(id: string) {
    return this.getById(COLLECTIONS.PRODUCTS, id);
  }

  static async createProduct(productData: any) {
    return this.create(COLLECTIONS.PRODUCTS, productData);
  }

  static async updateProduct(id: string, productData: any) {
    return this.update(COLLECTIONS.PRODUCTS, id, productData);
  }

  static async deleteProduct(id: string) {
    return this.delete(COLLECTIONS.PRODUCTS, id);
  }

  static async getProductsByCategory(category: string) {
    return this.query(COLLECTIONS.PRODUCTS, [
      { field: 'category', operator: '==', value: category }
    ]);
  }

  static async getLowStockProducts(minStock: number = 10) {
    return this.query(COLLECTIONS.PRODUCTS, [
      { field: 'stock', operator: '<=', value: minStock }
    ]);
  }
}

export class OrderService extends FirebaseService {
  static async getOrders() {
    return this.query(COLLECTIONS.ORDERS, [], 'createdAt');
  }

  static async createOrder(orderData: any) {
    return this.create(COLLECTIONS.ORDERS, orderData);
  }

  static async updateOrderStatus(id: string, status: string) {
    return this.update(COLLECTIONS.ORDERS, id, { status });
  }

  static async getOrdersByStatus(status: string) {
    return this.query(COLLECTIONS.ORDERS, [
      { field: 'status', operator: '==', value: status }
    ]);
  }
}

export class ExpenseService extends FirebaseService {
  static async getExpenses() {
    return this.query(COLLECTIONS.EXPENSES, [], 'date');
  }

  static async createExpense(expenseData: any) {
    return this.create(COLLECTIONS.EXPENSES, expenseData);
  }

  static async updateExpense(id: string, expenseData: any) {
    return this.update(COLLECTIONS.EXPENSES, id, expenseData);
  }

  static async deleteExpense(id: string) {
    return this.delete(COLLECTIONS.EXPENSES, id);
  }

  static async getExpensesByCategory(category: string) {
    return this.query(COLLECTIONS.EXPENSES, [
      { field: 'category', operator: '==', value: category }
    ]);
  }
}

export class SalesService extends FirebaseService {
  static async getSales() {
    return this.query(COLLECTIONS.SALES, [], 'date');
  }

  static async createSale(saleData: any) {
    return this.create(COLLECTIONS.SALES, saleData);
  }

  static async getSalesByDateRange(startDate: Date, endDate: Date) {
    return this.query(COLLECTIONS.SALES, [
      { field: 'date', operator: '>=', value: Timestamp.fromDate(startDate) },
      { field: 'date', operator: '<=', value: Timestamp.fromDate(endDate) }
    ]);
  }
}

export class UserService extends FirebaseService {
  static async getUsers() {
    return this.getAll(COLLECTIONS.USERS);
  }

  static async createUser(userData: any) {
    return this.create(COLLECTIONS.USERS, userData);
  }

  static async updateUser(id: string, userData: any) {
    return this.update(COLLECTIONS.USERS, id, userData);
  }

  static async deleteUser(id: string) {
    return this.delete(COLLECTIONS.USERS, id);
  }

  static async getUserByEmail(email: string) {
    const users = await this.query(COLLECTIONS.USERS, [
      { field: 'email', operator: '==', value: email }
    ]);
    return users.length > 0 ? users[0] : null;
  }
}
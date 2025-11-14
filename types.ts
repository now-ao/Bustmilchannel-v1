
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastPurchaseDate?: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  customerId?: string;
  date: string;
}

export interface CartItem extends SaleItem {}

export type View = 'dashboard' | 'inventory' | 'customers' | 'pos' | 'assistant';

export interface SupermarketData {
    products: Product[];
    customers: Customer[];
    sales: Sale[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    addCustomer: (customer: Omit<Customer, 'id'>) => void;
    updateCustomer: (customer: Customer) => void;
    deleteCustomer: (customerId: string) => void;
    processSale: (cart: CartItem[], customerId?: string) => void;
}

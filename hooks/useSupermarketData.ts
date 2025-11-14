
import { useState, useEffect, useCallback } from 'react';
import type { Product, Customer, Sale, CartItem, SupermarketData } from '../types';

const MOCK_PRODUCTS: Product[] = [
    { id: 'p1', name: 'Leite Integral', sku: 'SKU001', category: 'Laticínios', price: 4.50, stock: 150, lowStockThreshold: 20 },
    { id: 'p2', name: 'Pão de Forma', sku: 'SKU002', category: 'Padaria', price: 6.00, stock: 80, lowStockThreshold: 15 },
    { id: 'p3', name: 'Maçã Fuji (Kg)', sku: 'SKU003', category: 'Hortifruti', price: 7.99, stock: 200, lowStockThreshold: 30 },
    { id: 'p4', name: 'Peito de Frango (Kg)', sku: 'SKU004', category: 'Açougue', price: 18.90, stock: 50, lowStockThreshold: 10 },
    { id: 'p5', name: 'Coca-Cola 2L', sku: 'SKU005', category: 'Bebidas', price: 8.50, stock: 120, lowStockThreshold: 25 },
];

const MOCK_CUSTOMERS: Customer[] = [
    { id: 'c1', name: 'Ana Silva', email: 'ana.silva@example.com', phone: '(11) 98765-4321' },
    { id: 'c2', name: 'Bruno Costa', email: 'bruno.costa@example.com', phone: '(21) 91234-5678' },
];

export const useSupermarketData = (): SupermarketData => {
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        try {
            const storedProducts = localStorage.getItem('supermarket_products');
            const storedCustomers = localStorage.getItem('supermarket_customers');
            const storedSales = localStorage.getItem('supermarket_sales');

            if (storedProducts) {
                setProducts(JSON.parse(storedProducts));
            } else {
                setProducts(MOCK_PRODUCTS);
            }

            if (storedCustomers) {
                setCustomers(JSON.parse(storedCustomers));
            } else {
                setCustomers(MOCK_CUSTOMERS);
            }

            if (storedSales) {
                setSales(JSON.parse(storedSales));
            }

        } catch (error) {
            console.error("Failed to load data from localStorage", error);
            setProducts(MOCK_PRODUCTS);
            setCustomers(MOCK_CUSTOMERS);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('supermarket_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('supermarket_customers', JSON.stringify(customers));
    }, [customers]);

    useEffect(() => {
        localStorage.setItem('supermarket_sales', JSON.stringify(sales));
    }, [sales]);

    const addProduct = useCallback((product: Omit<Product, 'id'>) => {
        setProducts(prev => [...prev, { ...product, id: `p${Date.now()}` }]);
    }, []);

    const updateProduct = useCallback((updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }, []);

    const deleteProduct = useCallback((productId: string) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    }, []);

    const addCustomer = useCallback((customer: Omit<Customer, 'id'>) => {
        setCustomers(prev => [...prev, { ...customer, id: `c${Date.now()}` }]);
    }, []);

    const updateCustomer = useCallback((updatedCustomer: Customer) => {
        setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    }, []);
    
    const deleteCustomer = useCallback((customerId: string) => {
        setCustomers(prev => prev.filter(c => c.id !== customerId));
    }, []);

    const processSale = useCallback((cart: CartItem[], customerId?: string) => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const newSale: Sale = {
            id: `s${Date.now()}`,
            items: cart.map(({productId, productName, quantity, price}) => ({productId, productName, quantity, price})),
            total,
            customerId,
            date: new Date().toISOString(),
        };

        setSales(prev => [...prev, newSale]);

        setProducts(prevProducts => {
            const updatedProducts = [...prevProducts];
            cart.forEach(item => {
                const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
                if (productIndex !== -1) {
                    updatedProducts[productIndex].stock -= item.quantity;
                }
            });
            return updatedProducts;
        });
        
        if (customerId) {
            setCustomers(prevCustomers => prevCustomers.map(c => 
                c.id === customerId ? {...c, lastPurchaseDate: new Date().toISOString()} : c
            ));
        }

    }, []);

    return { 
        products, 
        customers, 
        sales, 
        addProduct, 
        updateProduct,
        deleteProduct, 
        addCustomer, 
        updateCustomer,
        deleteCustomer,
        processSale 
    };
};

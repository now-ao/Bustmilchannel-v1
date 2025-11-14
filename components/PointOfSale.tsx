
import React, { useState, useMemo } from 'react';
import type { SupermarketData, Product, CartItem } from '../types';

const PointOfSale: React.FC<SupermarketData> = ({ products, customers, processSale }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>(undefined);
  const [saleCompleted, setSaleCompleted] = useState(false);

  const filteredProducts = useMemo(() => 
    products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) && p.stock > 0),
    [products, searchTerm]
  );

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (existingItem) {
        if(existingItem.quantity < product.stock) {
           return prevCart.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return prevCart;
      }
      return [...prevCart, { productId: product.id, productName: product.name, quantity: 1, price: product.price }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if(product && quantity > product.stock) {
        quantity = product.stock;
    }

    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.productId !== productId));
    } else {
      setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalizeSale = () => {
    processSale(cart, selectedCustomerId);
    setCart([]);
    setSelectedCustomerId(undefined);
    setSaleCompleted(true);
    setTimeout(() => setSaleCompleted(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Product List */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col h-[calc(100vh-10rem)]">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map(p => (
              <div key={p.id} onClick={() => addToCart(p)} className="cursor-pointer border dark:border-gray-700 rounded-lg p-3 text-center hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors">
                <div className="w-full h-20 bg-gray-200 dark:bg-gray-700 rounded-md mb-2 flex items-center justify-center">
                    <img src={`https://picsum.photos/seed/${p.sku}/100/100`} alt={p.name} className="w-full h-full object-cover rounded-md" />
                </div>
                <p className="text-sm font-medium truncate text-gray-800 dark:text-gray-200">{p.name}</p>
                <p className="text-xs text-gray-500">R$ {p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col h-[calc(100vh-10rem)]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-gray-700 text-gray-700 dark:text-gray-200">Carrinho</h3>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">O carrinho está vazio.</p>
          ) : (
            cart.map(item => (
              <div key={item.productId} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">{item.productName}</p>
                  <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <input type="number" value={item.quantity} onChange={e => updateQuantity(item.productId, parseInt(e.target.value))} className="w-16 text-center border rounded-md dark:bg-gray-700 dark:border-gray-600 mx-2" />
                  <button onClick={() => updateQuantity(item.productId, 0)} className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t pt-4 mt-4 dark:border-gray-700">
          <select onChange={(e) => setSelectedCustomerId(e.target.value || undefined)} value={selectedCustomerId || ""} className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:border-gray-600">
            <option value="">Cliente Avulso</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="flex justify-between text-2xl font-bold mb-4">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <button onClick={handleFinalizeSale} disabled={cart.length === 0} className="w-full py-3 bg-green-600 text-white rounded-md text-lg font-bold hover:bg-green-700 disabled:bg-gray-400">
            Finalizar Venda
          </button>
          {saleCompleted && <div className="mt-4 text-center p-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-md">Venda concluída com sucesso!</div>}
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;

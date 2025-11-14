
import React from 'react';
import type { SupermarketData } from '../types';
import Card from './ui/Card';

const Dashboard: React.FC<SupermarketData> = ({ sales, customers, products }) => {
  const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);
  const lowStockItems = products.filter(p => p.stock <= p.lowStockThreshold).length;
  const topSellingProducts = sales
    .flatMap(sale => sale.items)
    // Fix: Explicitly type the accumulator to ensure correct type inference for topSellingProducts.
    .reduce((acc: Record<string, number>, item) => {
        acc[item.productName] = (acc[item.productName] || 0) + item.quantity;
        return acc;
    }, {});

  const sortedTopProducts = Object.entries(topSellingProducts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card
          title="Receita Total"
          value={`R$ ${totalRevenue.toFixed(2)}`}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
          color="bg-green-500"
        />
        <Card
          title="Total de Clientes"
          value={customers.length}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125" /></svg>}
          color="bg-blue-500"
        />
        <Card
          title="Itens com Baixo Estoque"
          value={lowStockItems}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
          color="bg-red-500"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Produtos Mais Vendidos</h3>
           <ul>
             {sortedTopProducts.map(([name, quantity]) => (
                <li key={name} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">{name}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">{quantity} unidades</span>
                </li>
             ))}
           </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Vendas Recentes</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b dark:border-gray-700">
                            <th className="py-2">ID da Venda</th>
                            <th className="py-2">Data</th>
                            <th className="py-2 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.slice(-5).reverse().map(sale => (
                            <tr key={sale.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="py-2 font-mono text-sm">{sale.id.substring(sale.id.length - 6)}</td>
                                <td className="py-2 text-sm">{new Date(sale.date).toLocaleDateString()}</td>
                                <td className="py-2 text-right font-semibold">R$ {sale.total.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import type { SupermarketData, Customer } from '../types';

const CustomerModal: React.FC<{
  customer: Partial<Customer> | null;
  onClose: () => void;
  onSave: (customer: Omit<Customer, 'id'> | Customer) => void;
}> = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState(customer || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Omit<Customer, 'id'> | Customer);
  };

  if (!customer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{customer.id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries({name: 'Nome', email: 'Email', phone: 'Telefone'}).map(([key, label]) => (
            <div className="mb-4" key={key}>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
              <input
                type={key === 'email' ? 'email' : 'text'}
                name={key}
                value={(formData as any)[key] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          ))}
          <div className="flex justify-end mt-6 space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Customers: React.FC<SupermarketData> = ({ customers, addCustomer, updateCustomer, deleteCustomer }) => {
    const [editingCustomer, setEditingCustomer] = useState<Partial<Customer> | null>(null);

    const handleSave = (customer: Omit<Customer, 'id'> | Customer) => {
        if ('id' in customer) {
            updateCustomer(customer as Customer);
        } else {
            addCustomer(customer);
        }
        setEditingCustomer(null);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {editingCustomer && <CustomerModal customer={editingCustomer} onClose={() => setEditingCustomer(null)} onSave={handleSave} />}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Lista de Clientes</h3>
                <button onClick={() => setEditingCustomer({})} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    Adicionar Cliente
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {['Nome', 'Email', 'Telefone', 'Última Compra', 'Ações'].map(h =>
                                <th key={h} className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{h}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {customers.map(c => (
                            <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{c.name}</td>
                                <td className="px-4 py-3">{c.email}</td>
                                <td className="px-4 py-3">{c.phone}</td>
                                <td className="px-4 py-3">{c.lastPurchaseDate ? new Date(c.lastPurchaseDate).toLocaleDateString() : 'N/A'}</td>
                                <td className="px-4 py-3 flex space-x-2">
                                    <button onClick={() => setEditingCustomer(c)} className="text-blue-500 hover:text-blue-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg></button>
                                    <button onClick={() => deleteCustomer(c.id)} className="text-red-500 hover:text-red-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;

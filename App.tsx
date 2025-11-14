
import React, { useState } from 'react';
import type { View } from './types';
import { useSupermarketData } from './hooks/useSupermarketData';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Customers from './components/Customers';
import PointOfSale from './components/PointOfSale';
import GeminiAssistant from './components/GeminiAssistant';
import Header from './components/Header';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const data = useSupermarketData();

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard {...data} />;
      case 'inventory':
        return <Inventory {...data} />;
      case 'customers':
        return <Customers {...data} />;
      case 'pos':
        return <PointOfSale {...data} />;
      case 'assistant':
        return <GeminiAssistant {...data} />;
      default:
        return <Dashboard {...data} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar currentView={view} setView={setView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentView={view} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;

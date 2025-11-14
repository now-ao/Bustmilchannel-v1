
import React from 'react';
import type { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavItem: React.FC<{
  viewName: View;
  label: string;
  icon: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
}> = ({ viewName, label, icon, currentView, setView }) => {
  const isActive = currentView === viewName;
  return (
    <li
      onClick={() => setView(viewName)}
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <div className="w-6 h-6 mr-3">{icon}</div>
      <span className="font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
    const iconClass = "w-6 h-6";
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0 hidden md:block">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Supermarket Pro</h1>
      </div>
      <nav className="mt-6 px-2">
        <ul>
          <NavItem 
            viewName="dashboard" 
            label="Dashboard"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            currentView={currentView}
            setView={setView}
          />
          <NavItem 
            viewName="inventory" 
            label="Estoque"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>}
            currentView={currentView}
            setView={setView}
          />
          <NavItem 
            viewName="customers" 
            label="Clientes"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125" /></svg>}
            currentView={currentView}
            setView={setView}
          />
          <NavItem 
            viewName="pos" 
            label="Ponto de Venda"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
            currentView={currentView}
            setView={setView}
          />
           <NavItem 
            viewName="assistant" 
            label="Assistente IA"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
            currentView={currentView}
            setView={setView}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

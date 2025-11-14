
import React from 'react';
import type { View } from '../types';

interface HeaderProps {
    currentView: View;
}

const viewTitles: Record<View, string> = {
    dashboard: 'Dashboard',
    inventory: 'Gestão de Estoque',
    customers: 'Gestão de Clientes',
    pos: 'Ponto de Venda (PDV)',
    assistant: 'Assistente IA'
};

const Header: React.FC<HeaderProps> = ({ currentView }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{viewTitles[currentView]}</h2>
        </header>
    );
};

export default Header;

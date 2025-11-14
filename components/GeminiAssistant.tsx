
import React, { useState, useRef, useEffect } from 'react';
import type { SupermarketData } from '../types';
import { getAiResponse } from '../services/geminiService';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const GeminiAssistant: React.FC<SupermarketData> = ({ products, sales, customers }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateContextPrompt = (userQuery: string): string => {
    const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold).map(p => `${p.name} (Estoque: ${p.stock})`).join(', ');
    const salesSummary = `Total de ${sales.length} vendas. Receita total de R$ ${sales.reduce((sum, s) => sum + s.total, 0).toFixed(2)}.`;
    const customerSummary = `${customers.length} clientes cadastrados.`;

    return `
      Contexto do Supermercado:
      - Resumo de Vendas: ${salesSummary}
      - Resumo de Clientes: ${customerSummary}
      - Produtos com Baixo Estoque: ${lowStockProducts || 'Nenhum'}
      - Lista de todos os produtos (nome, preço, estoque): ${products.map(p => `${p.name} (R$${p.price.toFixed(2)}, ${p.stock} em estoque)`).join('; ')}

      ---

      Pergunta do Usuário: "${userQuery}"

      ---
      
      Sua Tarefa: Com base no contexto acima, responda à pergunta do usuário de forma útil e concisa.
    `;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const fullPrompt = generateContextPrompt(input);
    const aiResponseText = await getAiResponse(fullPrompt);

    const aiMessage: Message = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const suggestions = [
    "Quais produtos estão com estoque baixo?",
    "Me dê uma ideia de promoção para o item menos vendido.",
    "Gere uma descrição para um novo produto: 'Suco de Laranja Natural 1L'",
    "Qual foi a nossa receita total até agora?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">IA</div>}
              <div className={`max-w-lg p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">IA</div>
              <div className="max-w-lg p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-.15s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                <h2 className="text-xl font-semibold mb-2">Como posso ajudar?</h2>
                <p className="mb-4">Faça uma pergunta ou clique em uma das sugestões abaixo.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestions.map((s, i) => (
                        <button key={i} onClick={() => handleSuggestionClick(s)} className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm text-left hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        )}
      </div>
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte algo ao assistente..."
            className="flex-1 bg-transparent p-3 focus:outline-none text-gray-800 dark:text-gray-200"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:text-gray-400 dark:disabled:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;

// components/SearchChatbox.tsx
"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon, Mic, Image } from 'lucide-react';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

const SearchChatbox: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user message
    setMessages([...messages, { type: 'user', content: query }]);
    
    // Simulate response (replace with actual API call)
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: `This is a response to: "${query}"` 
      }]);
      setLoading(false);
    }, 1000);
    
    setQuery('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <div className="flex flex-col h-full">
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96 min-h-64">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-center">
                <div className="text-slate-500">
                  <h3 className="text-xl font-semibold mb-2">How can I help you today?</h3>
                  <p className="text-sm">Ask me anything or try an example</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`p-3 rounded-lg max-w-3/4 ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-slate-200 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-200 text-slate-800 p-3 rounded-lg rounded-bl-none">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-slate-500 hover:text-slate-700"
              >
                <Image size={20} />
              </Button>
              
              <Input
                type="text"
                placeholder="Message Gemini..."
                className="flex-1 py-3 px-4 rounded-full border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={query}
                onChange={handleInputChange}
              />
              
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-slate-500 hover:text-slate-700"
              >
                <Mic size={20} />
              </Button>
              
              <Button 
                type="submit" 
                disabled={!query.trim()} 
                className={`rounded-full w-10 h-10 flex items-center justify-center ${
                  query.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300'
                }`}
              >
                <SendIcon size={18} className="text-white" />
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SearchChatbox;
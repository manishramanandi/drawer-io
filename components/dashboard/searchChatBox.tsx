// components/SearchChatbox.tsx
"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon, Mic, Image } from 'lucide-react';

const SearchChatbox: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Redirect to dashboard with search query
    router.push(`chat/searchResults?search=${encodeURIComponent(query)}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <div className="flex flex-col h-full">
          {/* Hero message area */}
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Find Your Perfect Product</h2>
              <p className="text-slate-600 mb-6">
                Search for products or ask questions about what you're looking for
              </p>
            </div>
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
                placeholder="Search products or ask a question..."
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
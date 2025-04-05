'use client';

import React, { useState, useRef } from 'react';
import { ImagePlus, SendHorizonal } from 'lucide-react';

const ChatPage = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessages = [...messages, { text: inputText, sender: 'user' }];
      setMessages(newMessages);
      setInputText('');
      scrollToBottom();

      setTimeout(() => {
        setMessages([...newMessages, { text: `Echo: ${inputText} (Simulated Gemini Response)`, sender: 'gemini' }]);
        scrollToBottom();
      }, 500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 text-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">What are you looking for?</h1>
      </header>

      {/* Messages */}
      <main className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-md px-4 py-2 rounded-xl ${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-white border border-gray-300 shadow-sm text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatContainerRef} />
      </main>

      {/* Centered Input at Bottom */}
      <div className="w-full flex justify-center py-6 bg-transparent">
        <div className="flex items-center gap-3 w-full max-w-2xl px-4">
          {/* Left Upload Button */}
          <button
            onClick={() => alert('Image upload coming soon!')}
            className="p-2 bg-white hover:bg-gray-100 rounded-full shadow transition"
          >
            <ImagePlus className="w-5 h-5 text-gray-700" />
          </button>

          {/* Centered Input */}
          <input
            type="text"
            className="flex-grow rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
            placeholder="Type your message..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />

          {/* Right Send Button */}
          <button
            onClick={handleSendMessage}
            className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow hover:from-blue-600 hover:to-cyan-600 transition"
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

"use client"

import { useState } from 'react';
import { Send, Paperclip, Mic, Image } from 'lucide-react';
import { Textarea } from '@/app/components/ui/textarea';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3 bg-white rounded-3xl p-4 border-2 border-gray-300 focus-within:border-blue-500 transition-colors shadow-lg">
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-shrink-0 p-2 hover:bg-blue-50 rounded-full transition-colors text-gray-600 hover:text-blue-600"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="flex-shrink-0 p-2 hover:bg-blue-50 rounded-full transition-colors text-gray-600 hover:text-blue-600"
              >
                <Image className="w-5 h-5" />
              </button>
            </div>
            
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a prompt here"
              disabled={disabled}
              className="flex-1 bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 placeholder:text-gray-400 min-h-[24px] max-h-[200px] px-0"
              rows={1}
            />
            
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-shrink-0 p-2 hover:bg-blue-50 rounded-full transition-colors text-gray-600 hover:text-blue-600"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                type="submit"
                disabled={!message.trim() || disabled}
                className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">
          Gemini may display inaccurate info, including about people, so double-check its responses.
        </p>
      </div>
    </div>
  );
}

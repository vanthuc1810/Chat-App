import { Plus, MessageSquare, MoreHorizontal, Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function Sidebar({ chats, currentChatId, onNewChat, onSelectChat, onDeleteChat }: SidebarProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#f8f9fa] to-[#e8eaed] w-64 border-r border-gray-200">
      {/* Header with Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="font-semibold text-gray-800 text-lg">Gemini</span>
        </div>
        <Button 
          onClick={onNewChat}
          className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New chat
        </Button>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group relative flex items-center gap-2 px-3 py-3 rounded-xl cursor-pointer transition-all ${
                currentChatId === chat.id
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-white/80'
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <MessageSquare className={`w-4 h-4 flex-shrink-0 ${currentChatId === chat.id ? 'text-blue-600' : 'text-gray-600'}`} />
              <span className={`flex-1 truncate text-sm ${currentChatId === chat.id ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>{chat.title}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-1 hover:bg-gray-200 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Edit functionality
                  }}
                >
                  <Edit2 className="w-3 h-3 text-gray-600" />
                </button>
                <button
                  className="p-1 hover:bg-gray-200 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                >
                  <Trash2 className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User Section */}
      <div className="p-3 border-t border-gray-200 bg-white/50">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/80 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-sm font-semibold text-white">
            U
          </div>
          <span className="text-sm text-gray-800">User Account</span>
          <MoreHorizontal className="w-4 h-4 ml-auto text-gray-600" />
        </div>
      </div>
    </div>
  );
}

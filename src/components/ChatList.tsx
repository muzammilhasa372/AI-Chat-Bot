import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { Chat } from '../types/chat';

interface ChatListProps {
  chats: Chat[];
  currentChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  currentChat,
  onSelectChat,
  onNewChat,
}) => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 w-full p-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
      >
        <Plus className="w-5 h-5" />
        New Chat
      </button>
      
      <div className="mt-4 flex-1 overflow-y-auto">
        {chats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`flex items-center gap-2 w-full p-3 rounded-lg hover:bg-gray-800 transition-colors ${
              currentChat?.id === chat.id ? 'bg-gray-800' : ''
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="truncate text-sm">{chat.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
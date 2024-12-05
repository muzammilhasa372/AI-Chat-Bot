import { useState, useCallback } from 'react';
import { Chat, Message } from '../types/chat';
import { loadChats, saveChats } from '../utils/storage';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>(() => loadChats());
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
    };
    setChats(prev => {
      const updated = [newChat, ...prev];
      saveChats(updated);
      return updated;
    });
    setCurrentChat(newChat);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentChat) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };

    setCurrentChat(prev => ({
      ...prev!,
      messages: [...prev!.messages, userMessage],
    }));

    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: "I'm a simulated AI response. In a real application, this would connect to an AI API.",
        role: 'assistant',
        timestamp: Date.now(),
      };

      setCurrentChat(prev => {
        const updated = {
          ...prev!,
          messages: [...prev!.messages, aiMessage],
        };
        setChats(chats => {
          const updatedChats = chats.map(chat => 
            chat.id === updated.id ? updated : chat
          );
          saveChats(updatedChats);
          return updatedChats;
        });
        return updated;
      });
      setIsLoading(false);
    }, 1000);
  }, [currentChat]);

  return {
    chats,
    currentChat,
    isLoading,
    createNewChat,
    sendMessage,
    setCurrentChat,
  };
};
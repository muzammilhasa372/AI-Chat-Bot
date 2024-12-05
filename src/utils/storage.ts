import { Chat } from '../types/chat';

const CHATS_KEY = 'ai-chatbot-chats';

export const saveChats = (chats: Chat[]): void => {
  localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
};

export const loadChats = (): Chat[] => {
  const chats = localStorage.getItem(CHATS_KEY);
  return chats ? JSON.parse(chats) : [];
};
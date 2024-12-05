import React from 'react';
import { ChatList } from './components/ChatList';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';
import { Bot } from 'lucide-react';

function App() {
  const {
    chats,
    currentChat,
    isLoading,
    createNewChat,
    sendMessage,
    setCurrentChat,
  } = useChat();

  return (
    <div className="flex h-screen">
      <ChatList
        chats={chats}
        currentChat={currentChat}
        onSelectChat={setCurrentChat}
        onNewChat={createNewChat}
      />
      
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {currentChat.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <Bot className="w-16 h-16 text-gray-400 mb-4" />
                  <h1 className="text-2xl font-bold text-gray-700 mb-2">
                    How can I help you today?
                  </h1>
                  <p className="text-gray-500 max-w-md">
                    Ask me anything! I'm here to help with questions, writing, analysis, and more.
                  </p>
                </div>
              ) : (
                currentChat.messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))
              )}
            </div>
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <Bot className="w-16 h-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Welcome to AI Chat
            </h1>
            <p className="text-gray-500 max-w-md">
              Start a new chat or select an existing conversation to begin.
            </p>
            <button
              onClick={createNewChat}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
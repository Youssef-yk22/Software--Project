import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { chatService } from '@/services/chat.service';
import { Message, ChatRoom } from '@/types/chat';

export default function ChatPage() {
  const [chats, setChats] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch chat rooms
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await chatService.getChatRooms();
        setChats(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
        setError('Failed to load chat rooms');
        setIsLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  // Fetch messages when a chat is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        try {
          const response = await chatService.getMessages(selectedChat.id);
          setMessages(response);
        } catch (error) {
          console.error('Error fetching messages:', error);
          setError('Failed to load messages');
        }
      }
    };

    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  const handleSendMessage = async () => {
    if (!selectedChat || !newMessage.trim()) return;

    try {
      await chatService.sendMessage(selectedChat.id, newMessage);
      setNewMessage('');
      // Refetch messages to get the new one
      const response = await chatService.getMessages(selectedChat.id);
      setMessages(response);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading chats...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Chat List */}
          <div className="md:col-span-1">
            <div className="rounded-lg bg-white p-4 shadow">
              <h2 className="mb-4 text-lg font-semibold">Conversations</h2>
              {chats.length === 0 ? (
                <p className="text-center text-gray-500">No conversations yet</p>
              ) : (
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`cursor-pointer rounded-lg p-3 hover:bg-gray-50 ${
                        selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{chat.name}</h3>
                        {chat.unreadCount > 0 && (
                          <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="md:col-span-3">
            <div className="flex h-[600px] flex-col rounded-lg bg-white shadow">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="border-b p-4">
                    <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isInstructor ? 'justify-start' : 'justify-end'
                        }`}
                      >
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[70%] ${
                            message.isInstructor
                              ? 'bg-gray-100'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex space-x-4"
                    >
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-lg border-0 px-4 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600"
                      />
                      <button 
                        type="submit"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  Select a conversation to start chatting
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import api from './api';
import { Message, ChatRoom } from '@/types/chat';

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'John Doe',
    content: 'Hi, I need help with CSS flexbox',
    timestamp: '10:30 AM',
    isInstructor: false,
  },
  {
    id: '2',
    sender: 'Jane Smith',
    content: 'Sure! What specific issue are you having with flexbox?',
    timestamp: '10:32 AM',
    isInstructor: true,
  },
  {
    id: '3',
    sender: 'John Doe',
    content: 'I cant seem to center my elements vertically',
    timestamp: '10:33 AM',
    isInstructor: false,
  }
];

const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Web Development Help',
    lastMessage: 'Can you help with CSS flexbox?',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Data Science Discussion',
    lastMessage: 'Question about machine learning models',
    unreadCount: 0,
  }
];

export const chatService = {
  async sendMessage(courseId: string, message: string) {
    // Mock sending a message
    return {
      id: Date.now().toString(),
      sender: 'John Doe',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isInstructor: false,
    };
  },

  async getMessages(courseId: string) {
    return mockMessages;
  },

  async updateMessage(courseId: string, messageId: string, message: string) {
    return {
      ...mockMessages.find(m => m.id === messageId),
      content: message
    };
  },

  async respondToQuery(courseId: string, messageId: string, reply: string) {
    return {
      id: Date.now().toString(),
      sender: 'Instructor',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isInstructor: true,
    };
  },

  async getChatRooms() {
    return mockChatRooms;
  }
}; 
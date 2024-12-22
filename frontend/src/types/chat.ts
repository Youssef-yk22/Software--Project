export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isInstructor: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
} 
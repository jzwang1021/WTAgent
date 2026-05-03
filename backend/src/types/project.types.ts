export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  towerType?: string;
  status: 'active' | 'archived';
}

export interface Conversation {
  id: string;
  projectId: string;
  messages: ChatMessage[];
  createdAt: Date;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

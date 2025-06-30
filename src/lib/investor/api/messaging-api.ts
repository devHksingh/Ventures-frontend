// Messaging API for investor-startup communication
// This is a frontend-only implementation with mock data

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  type?: 'text' | 'file';
  fileData?: {
    fileName: string;
    fileUrl: string;
    fileSize: string;
  };
}

export interface SendMessageResponse {
  messageId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface CreateConversationRequest {
  startupId: string;
  initialMessage: string;
}

export interface CreateConversationResponse {
  conversationId: string;
  message: string;
}

export interface UploadFileRequest {
  file: File;
  conversationId: string;
}

export interface UploadFileResponse {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  uploadedAt: string;
}

export interface MarkAsReadRequest {
  conversationId: string;
  messageIds: string[];
}

export interface GetConversationsResponse {
  conversations: Array<{
    id: string;
    startupId: string;
    startupName: string;
    startupCategory: string;
    startupStatus: 'online' | 'away' | 'offline';
    lastMessage: string;
    lastMessageAt: string;
    lastMessageType: 'text' | 'file';
    unreadCount: number;
    isPinned: boolean;
    hasUnreadMention: boolean;
    tags?: string[];
  }>;
}

export interface GetMessagesResponse {
  messages: Array<{
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    type: 'text' | 'file';
    status: 'sent' | 'delivered' | 'read';
    fileName?: string;
    fileUrl?: string;
    fileSize?: string;
  }>;
  hasMore: boolean;
  nextCursor?: string;
}

class MessagingAPI {
  // Simulate API delay
  private async delay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all conversations for the current user
  async getConversations(): Promise<GetConversationsResponse> {
    await this.delay(800);
    
    // Mock response
    return {
      conversations: [
        {
          id: '1',
          startupId: 'startup-1',
          startupName: 'TechFlow AI',
          startupCategory: 'Artificial Intelligence',
          startupStatus: 'online',
          lastMessage: 'Thank you for your interest in our Series A round.',
          lastMessageAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          lastMessageType: 'text',
          unreadCount: 2,
          isPinned: true,
          hasUnreadMention: false,
          tags: ['Series A', 'AI/ML']
        },
        {
          id: '2',
          startupId: 'startup-2',
          startupName: 'GreenEnergy Solutions',
          startupCategory: 'Clean Energy',
          startupStatus: 'away',
          lastMessage: 'Here is our updated pitch deck.',
          lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          lastMessageType: 'file',
          unreadCount: 0,
          isPinned: false,
          hasUnreadMention: false,
          tags: ['Seed', 'CleanTech']
        }
      ]
    };
  }
  // Get messages for a specific conversation
  async getMessages(conversationId: string, _cursor?: string, limit: number = 50): Promise<GetMessagesResponse> {
    await this.delay(600);
    
    // Note: limit parameter is for future pagination implementation
    console.log(`Getting messages for conversation ${conversationId}, limit: ${limit}`);
    
    // Mock response
    const allMessages = [
      {
        id: 'msg-1',
        conversationId,
        senderId: 'startup-1',
        senderName: 'TechFlow AI',
        content: 'Hello! Thank you for showing interest in TechFlow AI.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        type: 'text' as const,
        status: 'read' as const
      },
      {
        id: 'msg-2',
        conversationId,
        senderId: 'current-user',
        senderName: 'You',
        content: 'Thank you for reaching out. Could you share more details about your funding round?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        type: 'text' as const,
        status: 'read' as const
      }
    ];

    return {
      messages: allMessages,
      hasMore: false,
      nextCursor: undefined
    };
  }

  // Send a new message
  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    await this.delay(1000);
    
    // Validate request
    if (!request.content.trim() && request.type === 'text') {
      throw new Error('Message content cannot be empty');
    }
    
    if (!request.conversationId) {
      throw new Error('Conversation ID is required');
    }

    // Mock response
    return {
      messageId: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
  }

  // Upload a file
  async uploadFile(request: UploadFileRequest): Promise<UploadFileResponse> {
    await this.delay(2000); // Simulate longer upload time
    
    // Validate file
    if (!request.file) {
      throw new Error('File is required');
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (request.file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit');
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    if (!allowedTypes.includes(request.file.type)) {
      throw new Error('File type not supported');
    }

    // Mock file upload
    const fileUrl = URL.createObjectURL(request.file);
    
    return {
      fileId: `file-${Date.now()}`,
      fileName: request.file.name,
      fileUrl,
      fileSize: `${(request.file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString()
    };
  }

  // Mark messages as read
  async markAsRead(request: MarkAsReadRequest): Promise<void> {
    await this.delay(300);
    
    if (!request.conversationId || !request.messageIds.length) {
      throw new Error('Conversation ID and message IDs are required');
    }

    // In a real app, this would update the read status on the server
    console.log('Marked messages as read:', request.messageIds);
  }

  // Create a new conversation
  async createConversation(request: CreateConversationRequest): Promise<CreateConversationResponse> {
    await this.delay(1000);
    
    if (!request.startupId || !request.initialMessage.trim()) {
      throw new Error('Startup ID and initial message are required');
    }

    return {
      conversationId: `conv-${Date.now()}`,
      message: 'Conversation created successfully'
    };
  }

  // Search conversations
  async searchConversations(query: string): Promise<GetConversationsResponse> {
    await this.delay(500);
    
    // Mock search - in real app, this would search on the server
    const allConversations = await this.getConversations();
    const filteredConversations = allConversations.conversations.filter(conv =>
      conv.startupName.toLowerCase().includes(query.toLowerCase()) ||
      conv.startupCategory.toLowerCase().includes(query.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(query.toLowerCase())
    );

    return {
      conversations: filteredConversations
    };
  }

  // Get conversation by ID
  async getConversation(conversationId: string) {
    await this.delay(400);
    
    // Mock conversation data
    const conversations = await this.getConversations();
    const conversation = conversations.conversations.find(c => c.id === conversationId);
    
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    return conversation;
  }

  // Pin/Unpin conversation
  async pinConversation(conversationId: string, pinned: boolean): Promise<void> {
    await this.delay(300);
    console.log(`Conversation ${conversationId} ${pinned ? 'pinned' : 'unpinned'}`);
  }

  // Delete conversation
  async deleteConversation(conversationId: string): Promise<void> {
  await this.delay(500);
    console.log(`Conversation ${conversationId} deleted`);
  }

  // Get typing status
  async getTypingStatus(conversationId: string): Promise<{ isTyping: boolean; typingUsers: string[] }> {
    await this.delay(100);
    
    // Mock typing status for conversation
    console.log(`Getting typing status for conversation ${conversationId}`);
    return {
      isTyping: Math.random() > 0.8,
      typingUsers: Math.random() > 0.8 ? ['startup-user'] : []
    };
  }

  // Send typing indicator
  async sendTypingIndicator(conversationId: string, isTyping: boolean): Promise<void> {
    // No delay for typing indicators
    console.log(`Typing indicator sent for conversation ${conversationId}: ${isTyping}`);
  }
}

// Export singleton instance
export const messagingAPI = new MessagingAPI();

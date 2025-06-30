'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message, Conversation } from '../../types/messaging';
import { UNIFIED_STARTUPS, getStartupForMessaging } from '../../data/unified-startups';

// Generate conversations from unified startups for consistency
const conversations = UNIFIED_STARTUPS.slice(0, 6).map(startup => getStartupForMessaging(startup));

// Convert to lookup object for easy access
const mockConversations: { [id: string]: Conversation } = {};
conversations.forEach(conv => {
  mockConversations[conv.id] = conv;
});

// Generate sample messages for each conversation
const generateSampleMessages = (conversationId: string, startupName: string, startupId: string): Message[] => {
  const baseMessages: Message[] = [
    {
      id: `msg-1-${conversationId}`,
      conversationId,
      senderId: startupId,
      senderName: startupName,
      content: `Hello! Thank you for showing interest in ${startupName}. We are excited to potentially work with you.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      type: 'text',
      status: 'read'
    },
    {
      id: `msg-2-${conversationId}`,
      conversationId,
      senderId: 'current-user',
      senderName: 'You',
      content: 'Thank you for reaching out. I reviewed your profile and I am impressed with your technology. Could you share more details about your current funding round?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
      type: 'text',
      status: 'read'
    },
    {
      id: `msg-3-${conversationId}`,
      conversationId,
      senderId: startupId,
      senderName: startupName,
      content: 'Absolutely! We are currently raising our funding round. Our platform has shown significant growth and we have a strong client base.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
      type: 'text',
      status: 'read'
    }
  ];

  // Add a file message for some conversations
  if (Math.random() > 0.5) {
    baseMessages.push({
      id: `msg-4-${conversationId}`,
      conversationId,
      senderId: startupId,
      senderName: startupName,
      content: 'Here is our pitch deck with detailed financials and market analysis.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
      type: 'file',
      status: 'read',
      fileName: `${startupName}_Pitch_Deck_2024.pdf`,
      fileUrl: `/api/files/${startupId}-pitch-deck.pdf`,
      fileSize: '2.4 MB'
    });
  }

  // Add recent message
  baseMessages.push({
    id: `msg-5-${conversationId}`,
    conversationId,
    senderId: startupId,
    senderName: startupName,
    content: 'Looking forward to discussing this opportunity further. When would be a good time for a call?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: 'text',
    status: 'sent'
  });

  return baseMessages;
};

// Generate messages for all conversations
const mockMessages: { [conversationId: string]: Message[] } = {};
conversations.forEach(conv => {
  mockMessages[conv.id] = generateSampleMessages(conv.id, conv.startupName, conv.startupId);
});

interface UseMessagingReturn {
  conversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (content: string, type?: 'text' | 'file') => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
  markAsRead: (messageId: string) => void;
  isTyping: boolean;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
}

export function useMessaging(conversationId: string): UseMessagingReturn {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');
  
  // Refs for WebSocket simulation
  const wsRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  // Simulate WebSocket connection
  const connectWebSocket = useCallback(() => {
    setConnectionStatus('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
      setConnectionStatus('connected');
      console.log('WebSocket connected for conversation:', conversationId);
      
      // Simulate receiving typing indicators
      const typingInterval = setInterval(() => {
        if (Math.random() > 0.95) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 3000);
        }
      }, 2000);
      
      return () => clearInterval(typingInterval);
    }, 1000);
  }, [conversationId]);  // Fetch conversation and messages
  const fetchConversationData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching conversation data for ID:', conversationId);
      console.log('Available conversation IDs:', Object.keys(mockConversations));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get conversation data
      const conversationData = mockConversations[conversationId];
      if (!conversationData) {
        console.error('Conversation not found for ID:', conversationId);
        throw new Error('Conversation not found');
      }
      
      // Get messages for this conversation
      const messagesData = mockMessages[conversationId] || [];
      
      console.log('Found conversation:', conversationData);
      console.log('Found messages:', messagesData.length);
      
      setConversation(conversationData);
      setMessages(messagesData);
    } catch (err) {
      console.error('Error fetching conversation:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch conversation'));
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  // Send message
  const sendMessage = async (content: string, type: 'text' | 'file' = 'text') => {
    if (!content.trim() && type === 'text') return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: 'current-user',
      senderName: 'You',
      content,
      timestamp: new Date().toISOString(),
      type,
      status: 'sent'
    };
    
    // Optimistically add message
    setMessages(prev => [...prev, newMessage]);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update message status to delivered
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
      
      // Simulate read receipt after a delay
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'read' as const }
              : msg
          )
        );
      }, 2000);
      
      // Simulate response from startup (occasionally)
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const responseMessage: Message = {
            id: `msg-${Date.now() + 1}`,
            conversationId,
            senderId: conversation?.startupId || 'startup',
            senderName: conversation?.startupName || 'Startup',
            content: 'Thank you for your message. We will get back to you soon.',
            timestamp: new Date().toISOString(),
            type: 'text',
            status: 'sent'
          };
          setMessages(prev => [...prev, responseMessage]);
        }, 3000);
      }
      
    } catch (err) {
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
      throw err;
    }
  };

  // Upload file
  const uploadFile = async (file: File) => {
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create file message
      const fileMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId: 'current-user',
        senderName: 'You',
        content: `Shared a file: ${file.name}`,
        timestamp: new Date().toISOString(),
        type: 'file',
        status: 'sent',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file), // In real app, this would be the uploaded file URL
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      
      setMessages(prev => [...prev, fileMessage]);
      
      // Update status to delivered
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === fileMessage.id 
              ? { ...msg, status: 'delivered' as const }
              : msg
          )
        );
      }, 1000);
        } catch (err) {
      console.error('File upload failed:', err);
      throw new Error('Failed to upload file');
    }
  };

  // Mark message as read
  const markAsRead = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId && msg.senderId !== 'current-user'
          ? { ...msg, status: 'read' as const }
          : msg
      )
    );
  };  // Initialize
  useEffect(() => {
    fetchConversationData();
    connectWebSocket();
    
    // Capture current ref values for cleanup
    const currentWs = wsRef.current;
    const currentTypingTimeout = typingTimeoutRef.current;
    
    return () => {
      if (currentWs) {
        currentWs.close();
      }
      if (currentTypingTimeout) {
        clearTimeout(currentTypingTimeout);
      }
    };
  }, [conversationId, connectWebSocket, fetchConversationData]);

  // Auto-mark unread messages as read when they are viewed
  useEffect(() => {
    const unreadMessages = messages.filter(
      msg => msg.senderId !== 'current-user' && msg.status !== 'read'
    );
    
    if (unreadMessages.length > 0) {
      const timer = setTimeout(() => {
        unreadMessages.forEach(msg => markAsRead(msg.id));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);

  return {
    conversation,
    messages,
    isLoading,
    error,
    sendMessage,
    uploadFile,
    markAsRead,
    isTyping,
    connectionStatus
  };
}

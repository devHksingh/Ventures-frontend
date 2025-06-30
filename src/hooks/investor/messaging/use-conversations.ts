'use client';

import { useState, useEffect } from 'react';
import type { Conversation } from '../../types/messaging';
import { UNIFIED_STARTUPS, getStartupForMessaging } from '../../data/unified-startups';

// Mock data using unified startups for consistency
const mockConversations: Conversation[] = [
  getStartupForMessaging(UNIFIED_STARTUPS[0]), // TechFlow AI
  getStartupForMessaging(UNIFIED_STARTUPS[1]), // GreenEnergy Solutions  
  getStartupForMessaging(UNIFIED_STARTUPS[2]), // HealthTech Innovations
  getStartupForMessaging(UNIFIED_STARTUPS[3]), // FinTech Pro
  getStartupForMessaging(UNIFIED_STARTUPS[4]), // CyberShield Security
  getStartupForMessaging(UNIFIED_STARTUPS[5]), // EduTech Analytics
];

interface UseConversationsReturn {
  conversations: Conversation[];
  isLoading: boolean;
  error: Error | null;
  markAsRead: (conversationId: string) => void;
  pinConversation: (conversationId: string) => void;
  unpinConversation: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
  refreshConversations: () => void;
}

export function useConversations(): UseConversationsReturn {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Simulate API call to fetch conversations
  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      const data = mockConversations;
      
      setConversations(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch conversations'));
    } finally {
      setIsLoading(false);
    }
  };

  // Mark conversation as read
  const markAsRead = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conversation => 
        conversation.id === conversationId 
          ? { ...conversation, unreadCount: 0, hasUnreadMention: false }
          : conversation
      )
    );
  };

  // Pin conversation
  const pinConversation = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conversation => 
        conversation.id === conversationId 
          ? { ...conversation, isPinned: true }
          : conversation
      )
    );
  };

  // Unpin conversation
  const unpinConversation = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conversation => 
        conversation.id === conversationId 
          ? { ...conversation, isPinned: false }
          : conversation
      )
    );
  };

  // Delete conversation
  const deleteConversation = (conversationId: string) => {
    setConversations(prev => 
      prev.filter(conversation => conversation.id !== conversationId)
    );
  };

  // Refresh conversations
  const refreshConversations = () => {
    fetchConversations();
  };

  // Initial fetch
  useEffect(() => {
    fetchConversations();
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate typing indicators
      setConversations(prev => 
        prev.map(conversation => ({
          ...conversation,
          isTyping: Math.random() > 0.9 && conversation.startupStatus === 'online'
        }))
      );
      
      // Simulate new messages occasionally
      if (Math.random() > 0.95) {
        setConversations(prev => {
          const randomIndex = Math.floor(Math.random() * prev.length);
          return prev.map((conversation, index) => 
            index === randomIndex 
              ? {
                  ...conversation,
                  lastMessage: 'New message received',
                  lastMessageAt: new Date().toISOString(),
                  unreadCount: conversation.unreadCount + 1
                }
              : conversation
          );
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    conversations,
    isLoading,
    error,
    markAsRead,
    pinConversation,
    unpinConversation,
    deleteConversation,
    refreshConversations
  };
}

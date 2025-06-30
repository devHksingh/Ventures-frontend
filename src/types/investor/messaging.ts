// Types for the messaging system

export interface Message {
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
}

export interface Conversation {
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
  isTyping: boolean;
  tags?: string[];
}

export interface FileAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface TypingIndicator {
  userId: string;
  userName: string;
  isTyping: boolean;
  timestamp: string;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  role: 'investor' | 'startup';
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  lastSeen?: string;
}

export interface MessageReaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  timestamp: string;
}

export interface ConversationSettings {
  id: string;
  conversationId: string;
  notifications: boolean;
  muteUntil?: string;
  autoDeleteAfter?: number; // days
  theme?: 'light' | 'dark';
}

// WebSocket event types
export interface WebSocketMessage {
  type: 'message' | 'typing' | 'read_receipt' | 'user_status' | 'file_upload';
  payload: unknown;
  timestamp: string;
  conversationId?: string;
}

export interface MessageEvent extends WebSocketMessage {
  type: 'message';
  payload: Message;
}

export interface TypingEvent extends WebSocketMessage {
  type: 'typing';
  payload: TypingIndicator;
}

export interface ReadReceiptEvent extends WebSocketMessage {
  type: 'read_receipt';
  payload: {
    messageId: string;
    readBy: string;
    readAt: string;
  };
}

export interface UserStatusEvent extends WebSocketMessage {
  type: 'user_status';
  payload: {
    userId: string;
    status: 'online' | 'away' | 'offline';
    lastSeen?: string;
  };
}

export interface FileUploadEvent extends WebSocketMessage {
  type: 'file_upload';
  payload: {
    progress: number;
    status: 'uploading' | 'completed' | 'failed';
    fileId?: string;
    error?: string;
  };
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    nextCursor?: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
}

// Search and filter types
export interface ConversationFilter {
  status?: 'read' | 'unread' | 'pinned';
  category?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  participants?: string[];
}

export interface MessageSearch {
  query: string;
  conversationId?: string;
  type?: 'text' | 'file';
  dateRange?: {
    start: string;
    end: string;
  };
  sender?: string;
}

// Notification types
export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  sound: boolean;
  mentions: boolean;
  directMessages: boolean;
  groupMessages: boolean;
  fileShares: boolean;
  quietHours?: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
    timezone: string;
  };
}

export interface MessageNotification {
  id: string;
  type: 'new_message' | 'mention' | 'file_share' | 'typing';
  title: string;
  message: string;
  conversationId: string;
  senderId: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Security and compliance types
export interface FileSecuritySettings {
  encryption: boolean;
  expiresAfter?: number; // days
  downloadLimit?: number;
  watermark: boolean;
  accessLog: boolean;
}

export interface ConversationAuditLog {
  id: string;
  conversationId: string;
  action: 'message_sent' | 'message_read' | 'file_uploaded' | 'file_downloaded' | 'participant_added' | 'participant_removed';
  userId: string;
  timestamp: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

// UI State types
export interface MessagingUIState {
  selectedConversationId?: string;
  sidebarCollapsed: boolean;
  searchQuery: string;
  activeFilters: ConversationFilter;
  messageInputText: string;
  showEmojiPicker: boolean;
  showFileUploader: boolean;
  replyToMessage?: string;
  editingMessage?: string;
}

export interface ChatTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    messageBackground: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    accent: string;
  };
}

// Integration types
export interface CalendarIntegration {
  enabled: boolean;
  provider: 'google' | 'outlook' | 'apple';
  syncMeetings: boolean;
  autoSchedule: boolean;
}

export interface VideoCallIntegration {
  enabled: boolean;
  provider: 'zoom' | 'teams' | 'meet' | 'webex';
  autoGenerateLinks: boolean;
  recordMeetings: boolean;
}

export interface CRMIntegration {
  enabled: boolean;
  provider: 'salesforce' | 'hubspot' | 'pipedrive';
  syncContacts: boolean;
  logActivities: boolean;
}

// Analytics types
export interface ConversationAnalytics {
  conversationId: string;
  totalMessages: number;
  messagesByDay: { date: string; count: number }[];
  averageResponseTime: number; // minutes
  participantActivity: { userId: string; messageCount: number; lastActive: string }[];
  fileShareCount: number;
  mostActiveHours: number[];
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface MessagingAnalytics {
  totalConversations: number;
  activeConversations: number;
  totalMessages: number;
  averageResponseTime: number;
  fileShareVolume: number;
  userEngagement: {
    dailyActiveUsers: number;
    messageFrequency: number;
    peakUsageHours: number[];
  };
  conversationOutcomes: {
    dealsClosed: number;
    meetingsScheduled: number;
    documentsShared: number;
  };
}

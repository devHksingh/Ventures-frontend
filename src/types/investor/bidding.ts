export const BidStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  NEGOTIATING: 'negotiating',
  WITHDRAWN: 'withdrawn',
  EXPIRED: 'expired'
} as const;

export type BidStatus = typeof BidStatus[keyof typeof BidStatus];

export interface Bid {
  id: string;
  startupId: string;
  startupName: string;
  startupCategory: string;
  investorId: string;
  investorName: string;
  amount: number;
  equityPercentage: number;
  valuation: number;
  terms: BidTerms;
  status: BidStatus;
  submittedAt: string;
  updatedAt: string;
  expiresAt: string;
  dueDiligenceRequirements: string[];
  timeline: BidTimeline;
  negotiations: BidNegotiation[];
  attachments?: BidAttachment[];
}

export interface BidTerms {
  preferredShares: boolean;
  boardSeat: boolean;
  liquidationPreference: number;
  antiDilution: 'none' | 'weighted-average' | 'full-ratchet';
  proRataRights: boolean;
  tagAlongRights: boolean;
  dragAlongRights: boolean;
  votingRights: boolean;
  informationRights: boolean;
  useOfFunds: string;
  milestones: string[];
  restrictions: string[];
}

export interface BidTimeline {
  dueDiligenceDeadline: string;
  fundingDeadline: string;
  expectedClosing: string;
  milestoneReviewDates: string[];
}

export interface BidNegotiation {
  id: string;
  bidId: string;
  participantId: string;
  participantName: string;
  participantType: 'investor' | 'startup';
  message: string;
  proposedChanges?: Partial<Bid>;
  timestamp: string;
  attachments?: BidAttachment[];
}

export interface BidAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface BidSubmissionData {
  startupId: string;
  amount: number;
  equityPercentage: number;
  terms: BidTerms;
  dueDiligenceRequirements: string[];
  timeline: Omit<BidTimeline, 'milestoneReviewDates'> & {
    milestoneReviewDates: string[];
  };
  message?: string;
  attachments?: File[];
}

export interface BidFilters {
  status?: BidStatus[];
  amountRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: string;
    end: string;
  };
  startupCategory?: string[];
  sortBy?: 'amount' | 'date' | 'valuation' | 'equity';
  sortOrder?: 'asc' | 'desc';
}

export interface BidStats {
  totalBids: number;
  pendingBids: number;
  acceptedBids: number;
  rejectedBids: number;
  negotiatingBids: number;
  totalAmountBid: number;
  averageBidAmount: number;
  successRate: number;
  averageEquityRequested: number;
}

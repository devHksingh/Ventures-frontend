import { useState, useEffect, useCallback } from 'react';
import { BidStatus } from '../../../types/investor/bidding';
import type { Bid, BidSubmissionData, BidFilters, BidStats, BidNegotiation } from '../../../types/investor/bidding';
import { UNIFIED_STARTUPS, getStartupForBidding } from '../../../data/investor/unified-startups';

// Mock data using unified startups for consistency
const mockBids: Bid[] = [
  getStartupForBidding(UNIFIED_STARTUPS[0], 500000), // TechFlow AI
  getStartupForBidding(UNIFIED_STARTUPS[1], 250000), // GreenEnergy Solutions  
  getStartupForBidding(UNIFIED_STARTUPS[2], 350000), // HealthTech Innovations
  getStartupForBidding(UNIFIED_STARTUPS[3], 400000), // FinTech Pro
  getStartupForBidding(UNIFIED_STARTUPS[4], 300000), // CyberShield Security
];

interface UseBiddingOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useBidding(options: UseBiddingOptions = {}) {
  const { autoRefresh = true, refreshInterval = 30000 } = options;
  
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<BidFilters>({});

  // Fetch bids
  const fetchBids = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBids(mockBids);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Submit new bid
  const submitBid = useCallback(async (bidData: BidSubmissionData): Promise<Bid> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newBid: Bid = {
        id: `bid-${Date.now()}`,
        startupId: bidData.startupId,
        startupName: 'Sample Startup', // Would come from API
        startupCategory: 'Technology', // Would come from API
        investorId: 'current-investor-id',
        investorName: 'Current Investor',
        amount: bidData.amount,
        equityPercentage: bidData.equityPercentage,
        valuation: bidData.amount / (bidData.equityPercentage / 100),
        status: BidStatus.PENDING,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        dueDiligenceRequirements: bidData.dueDiligenceRequirements,
        terms: bidData.terms,
        timeline: {
          ...bidData.timeline,
          milestoneReviewDates: bidData.timeline.milestoneReviewDates
        },
        negotiations: []
      };
      
      setBids(prev => [newBid, ...prev]);
      return newBid;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update bid status
  const updateBidStatus = useCallback(async (bidId: string, status: BidStatus): Promise<void> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setBids(prev => prev.map(bid => 
        bid.id === bidId 
          ? { ...bid, status, updatedAt: new Date().toISOString() }
          : bid
      ));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, []);

  // Add negotiation message
  const addNegotiation = useCallback(async (
    bidId: string, 
    message: string, 
    proposedChanges?: Partial<Bid>
  ): Promise<void> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newNegotiation: BidNegotiation = {
        id: `neg-${Date.now()}`,
        bidId,
        participantId: 'current-investor-id',
        participantName: 'Current Investor',
        participantType: 'investor',
        message,
        proposedChanges,
        timestamp: new Date().toISOString()
      };
      
      setBids(prev => prev.map(bid => 
        bid.id === bidId 
          ? { 
              ...bid, 
              negotiations: [...bid.negotiations, newNegotiation],
              status: BidStatus.NEGOTIATING,
              updatedAt: new Date().toISOString()
            }
          : bid
      ));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, []);

  // Withdraw bid
  const withdrawBid = useCallback(async (bidId: string): Promise<void> => {
    return updateBidStatus(bidId, BidStatus.WITHDRAWN);
  }, [updateBidStatus]);

  // Get filtered bids
  const getFilteredBids = useCallback(() => {
    let filtered = [...bids];
    
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(bid => filters.status!.includes(bid.status));
    }
    
    if (filters.amountRange) {
      filtered = filtered.filter(bid => 
        bid.amount >= filters.amountRange!.min && 
        bid.amount <= filters.amountRange!.max
      );
    }
    
    if (filters.dateRange) {
      filtered = filtered.filter(bid => {
        const bidDate = new Date(bid.submittedAt);
        const startDate = new Date(filters.dateRange!.start);
        const endDate = new Date(filters.dateRange!.end);
        return bidDate >= startDate && bidDate <= endDate;
      });
    }
    
    if (filters.startupCategory && filters.startupCategory.length > 0) {
      filtered = filtered.filter(bid => 
        filters.startupCategory!.includes(bid.startupCategory)
      );
    }
      // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: number | Date, bValue: number | Date;
        
        switch (filters.sortBy) {
          case 'amount':
            aValue = a.amount;
            bValue = b.amount;
            break;
          case 'date':
            aValue = new Date(a.submittedAt);
            bValue = new Date(b.submittedAt);
            break;
          case 'valuation':
            aValue = a.valuation;
            bValue = b.valuation;
            break;
          case 'equity':
            aValue = a.equityPercentage;
            bValue = b.equityPercentage;
            break;
          default:
            return 0;        }
        
        if (filters.sortOrder === 'desc') {
          return aValue < bValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }
    
    return filtered;
  }, [bids, filters]);

  // Calculate bid statistics
  const getBidStats = useCallback((): BidStats => {
    const totalBids = bids.length;
    const pendingBids = bids.filter(bid => bid.status === BidStatus.PENDING).length;
    const acceptedBids = bids.filter(bid => bid.status === BidStatus.ACCEPTED).length;
    const rejectedBids = bids.filter(bid => bid.status === BidStatus.REJECTED).length;
    const negotiatingBids = bids.filter(bid => bid.status === BidStatus.NEGOTIATING).length;
    
    const totalAmountBid = bids.reduce((sum, bid) => sum + bid.amount, 0);
    const averageBidAmount = totalBids > 0 ? totalAmountBid / totalBids : 0;
    const successRate = totalBids > 0 ? (acceptedBids / totalBids) * 100 : 0;
    const averageEquityRequested = totalBids > 0 
      ? bids.reduce((sum, bid) => sum + bid.equityPercentage, 0) / totalBids 
      : 0;
    
    return {
      totalBids,
      pendingBids,
      acceptedBids,
      rejectedBids,
      negotiatingBids,
      totalAmountBid,
      averageBidAmount,
      successRate,
      averageEquityRequested
    };
  }, [bids]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<BidFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Get bid by ID
  const getBidById = useCallback((bidId: string): Bid | undefined => {
    return bids.find(bid => bid.id === bidId);
  }, [bids]);

  useEffect(() => {
    fetchBids();
    
    if (autoRefresh) {
      const interval = setInterval(fetchBids, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchBids, autoRefresh, refreshInterval]);

  return {
    // Data
    bids: getFilteredBids(),
    allBids: bids,
    isLoading,
    error,
    filters,
    stats: getBidStats(),
    
    // Actions
    submitBid,
    updateBidStatus,
    addNegotiation,
    withdrawBid,
    updateFilters,
    clearFilters,
    getBidById,
    refetch: fetchBids
  };
}

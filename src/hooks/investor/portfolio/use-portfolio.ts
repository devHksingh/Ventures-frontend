import { useState, useEffect, useCallback } from 'react';
import { UNIFIED_STARTUPS, getStartupForPortfolioCustom } from '../../../data/investor/unified-startups';

// Types
export interface Portfolio {
  totalValue: number;
  totalInvested: number;
  totalGains: number;
  totalLosses: number;
  roi: number;
  diversification: DiversificationData[];
  performance: PerformanceData[];
  investments: Investment[];
  taxImplications: TaxData;
}

export interface Investment {
  id: string;
  ideaId: string;
  title: string;
  category: string;
  imageUrl: string;
  amount: number;
  currentValue: number;
  date: string;
  status: 'Active' | 'Completed' | 'Pending';
  roi?: number;
  transactions: Transaction[];
  projectedROI?: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface Transaction {
  id: string;
  transactionId: string;
  ideaId: string;
  ideaName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'investment' | 'return' | 'dividend';
}

export interface DiversificationData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface PerformanceData {
  date: string;
  totalValue: number;
  invested: number;
  gains: number;
}

export interface TaxData {
  capitalGains: number;
  capitalLosses: number;
  netGains: number;
  estimatedTax: number;
}

interface UsePortfolioOptions {
  refreshInterval?: number;
}

interface UsePortfolioFilters {
  status?: string;
  dateRange?: string;
  category?: string;
  riskLevel?: string;
}

// Mock data - Using unified startups for consistency
const mockInvestments: Investment[] = [
  getStartupForPortfolioCustom(UNIFIED_STARTUPS[0], {
    amount: 25000,
    currentValue: 27125,
    date: '2025-05-20',
    status: 'Active',
    paymentMethod: 'Bank Transfer'
  }),
  getStartupForPortfolioCustom(UNIFIED_STARTUPS[1], {
    amount: 15000,
    currentValue: 15780,
    date: '2025-05-18',
    status: 'Active',
    paymentMethod: 'Credit Card'
  }),
  getStartupForPortfolioCustom(UNIFIED_STARTUPS[2], {
    amount: 30000,
    currentValue: 33840,
    date: '2025-03-10',
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    hasReturns: true,
    returnAmount: 3840,
    returnDate: '2025-05-12'
  }),
  getStartupForPortfolioCustom(UNIFIED_STARTUPS[4], {
    amount: 18000,
    currentValue: 20160,
    date: '2025-04-15',
    status: 'Active',
    paymentMethod: 'Bank Transfer'
  }),
  getStartupForPortfolioCustom(UNIFIED_STARTUPS[6], {
    amount: 22000,
    currentValue: 24420,
    date: '2025-02-28',
    status: 'Active',
    paymentMethod: 'Wire Transfer'
  })
];

const mockPerformance: PerformanceData[] = [
  { date: '2025-01-01', totalValue: 0, invested: 0, gains: 0 },
  { date: '2025-02-01', totalValue: 15000, invested: 15000, gains: 0 },
  { date: '2025-03-01', totalValue: 15200, invested: 15000, gains: 200 },
  { date: '2025-04-01', totalValue: 45800, invested: 45000, gains: 800 },
  { date: '2025-05-01', totalValue: 69500, invested: 70000, gains: -500 },
  { date: '2025-05-28', totalValue: 76745, invested: 70000, gains: 6745 },
];

export function usePortfolio(options: UsePortfolioOptions = {}) {
  const { refreshInterval = 30000 } = options;
  
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<UsePortfolioFilters>({});

  const calculatePortfolio = useCallback((investments: Investment[]): Portfolio => {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalGains = Math.max(0, totalValue - totalInvested);
    const totalLosses = Math.max(0, totalInvested - totalValue);
    const roi = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0;

    // Calculate diversification
    const categoryTotals = investments.reduce((acc, inv) => {
      acc[inv.category] = (acc[inv.category] || 0) + inv.currentValue;
      return acc;
    }, {} as Record<string, number>);

    const diversification: DiversificationData[] = Object.entries(categoryTotals).map(([category, amount], index) => ({
      category,
      amount,
      percentage: (amount / totalValue) * 100,
      color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5],
    }));

    // Calculate tax implications
    const capitalGains = Math.max(0, totalValue - totalInvested);
    const capitalLosses = Math.max(0, totalInvested - totalValue);
    const netGains = capitalGains - capitalLosses;
    const estimatedTax = netGains * 0.2; // Simplified 20% capital gains tax

    return {
      totalValue,
      totalInvested,
      totalGains,
      totalLosses,
      roi,
      diversification,
      performance: mockPerformance,
      investments,
      taxImplications: {
        capitalGains,
        capitalLosses,
        netGains,
        estimatedTax,
      },
    };
  }, []);

  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const calculatedPortfolio = calculatePortfolio(mockInvestments);
      setPortfolio(calculatedPortfolio);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [calculatePortfolio]);

  const updateFilters = useCallback((newFilters: UsePortfolioFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const getFilteredInvestments = useCallback(() => {
    if (!portfolio) return [];
    
    let filtered = [...portfolio.investments];
    
    if (filters.status) {
      filtered = filtered.filter(inv => inv.status === filters.status);
    }
    
    if (filters.category) {
      filtered = filtered.filter(inv => inv.category === filters.category);
    }
    
    if (filters.riskLevel) {
      filtered = filtered.filter(inv => inv.riskLevel === filters.riskLevel);
    }
    
    return filtered;
  }, [portfolio, filters]);

  useEffect(() => {
    fetchPortfolio();
    
    // Set up refresh interval
    const interval = setInterval(fetchPortfolio, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPortfolio, refreshInterval]);

  return {
    portfolio,
    isLoading,
    error,
    filters,
    updateFilters,
    getFilteredInvestments,
    refetch: fetchPortfolio,
  };
}

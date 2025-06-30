import { useState, useEffect, useCallback } from 'react';

interface Investment {
  id: string;
  ideaId: string;
  title: string;
  category: string;
  imageUrl: string;
  amount: number;
  date: string;
  status: 'Active' | 'Completed' | 'Pending';
  roi?: number;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  transactionId: string;
  ideaId: string;
  ideaName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
}

interface UseInvestmentsOptions {
  initialData?: Investment[];
}

interface UseInvestmentsFilters {
  status?: string;
  dateRange?: string;
  minAmount?: string;
  maxAmount?: string;
}

export function useInvestments(options: UseInvestmentsOptions = {}) {
  const { initialData } = options;
  
  const [investments, setInvestments] = useState<Investment[]>(initialData || []);
  const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<UseInvestmentsFilters>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchInvestments = useCallback(async (params: UseInvestmentsFilters = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock data
      const mockInvestments: Investment[] = [
        {
          id: '1',
          ideaId: '101',
          title: 'AI-Powered Sales Analytics Platform',
          category: 'Software',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          amount: 25000,
          date: 'May 20, 2025',
          status: 'Active' as const,
          roi: 8.5,
          transactions: [
            {
              id: 't1',
              transactionId: 'TXN-001-25K',
              ideaId: '101',
              ideaName: 'AI-Powered Sales Analytics Platform',
              amount: 25000,
              date: 'May 20, 2025',
              paymentMethod: 'Bank Transfer',
              status: 'completed' as const,
            }
          ],
        },
        {
          id: '2',
          ideaId: '102',
          title: 'Sustainable Urban Farming Solution',
          category: 'Agriculture',
          imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          amount: 15000,
          date: 'May 18, 2025',
          status: 'Active' as const,
          roi: 5.2,
          transactions: [
            {
              id: 't2',
              transactionId: 'TXN-002-15K',
              ideaId: '102',
              ideaName: 'Sustainable Urban Farming Solution',
              amount: 15000,
              date: 'May 18, 2025',
              paymentMethod: 'Credit Card',
              status: 'completed',
            }
          ],
        },
        {
          id: '3',
          ideaId: '103',
          title: 'AR-Based Education App',
          category: 'Education',
          imageUrl: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
          amount: 10000,
          date: 'May 15, 2025',
          status: 'Pending' as const,
          transactions: [
            {
              id: 't3',
              transactionId: 'TXN-003-10K',
              ideaId: '103',
              ideaName: 'AR-Based Education App',
              amount: 10000,
              date: 'May 15, 2025',
              paymentMethod: 'Bank Transfer',
              status: 'pending' as const,
            }
          ],
        },
        {
          id: '4',
          ideaId: '104',
          title: 'Wearable Health Monitoring Device',
          category: 'Healthcare',
          imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2980&q=80',
          amount: 30000,
          date: 'March 10, 2025',
          status: 'Completed' as const,
          roi: 12.8,
          transactions: [
            {
              id: 't4',
              transactionId: 'TXN-004-30K',
              ideaId: '104',
              ideaName: 'Wearable Health Monitoring Device',
              amount: 30000,
              date: 'March 10, 2025',
              paymentMethod: 'PayPal',
              status: 'completed' as const,
            },
            {
              id: 't5',
              transactionId: 'TXN-005-ROI',
              ideaId: '104',
              ideaName: 'Wearable Health Monitoring Device (ROI)',
              amount: 3840,
              date: 'May 12, 2025',
              paymentMethod: 'Bank Transfer',
              status: 'completed',
            }
          ],
        },
      ];

      // Filter investments based on params
      let filtered = [...mockInvestments];
      
      if (params.status) {
        filtered = filtered.filter(inv => inv.status === params.status);
      }
      
      if (params.minAmount) {
        filtered = filtered.filter(inv => inv.amount >= parseInt(params.minAmount || '0'));
      }
      
      if (params.maxAmount) {
        filtered = filtered.filter(inv => inv.amount <= parseInt(params.maxAmount || '0'));
      }
      
      if (params.dateRange) {
        // Simplified date filtering for demo
        const today = new Date();
        const filterDate = new Date();
        
        switch (params.dateRange) {
          case '30days':
            filterDate.setDate(today.getDate() - 30);
            break;
          case '90days':
            filterDate.setDate(today.getDate() - 90);
            break;
          case '1year':
            filterDate.setFullYear(today.getFullYear() - 1);
            break;
        }
        
        filtered = filtered.filter(inv => {
          const invDate = new Date(inv.date);
          return invDate >= filterDate;
        });
      }
      
      // Extract all transactions
      const allTransactions = mockInvestments.flatMap(inv => inv.transactions);
      
      setInvestments(mockInvestments);
      setFilteredInvestments(filtered);
      setTransactions(allTransactions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvestments(filters);
  }, [fetchInvestments, filters]);

  const updateFilters = useCallback((newFilters: UseInvestmentsFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  }, []);

  const getInvestment = useCallback(
    (id: string) => {
      return investments.find((investment) => investment.id === id);
    },
    [investments]
  );

  const getDistributionByCategory = useCallback(() => {
    const distribution: Record<string, number> = {};
    
    investments.forEach((investment) => {
      const { category, amount } = investment;
      
      if (distribution[category]) {
        distribution[category] += amount;
      } else {
        distribution[category] = amount;
      }
    });
    
    // Convert to array for easier display
    return Object.entries(distribution).map(([category, amount], index) => {
      // Array of predefined colors
      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6'];
      return {
        category,
        amount,
        color: colors[index % colors.length],
      };
    });
  }, [investments]);

  const getInvestmentSummary = useCallback(() => {
    const totalInvestment = investments.reduce((sum, investment) => sum + investment.amount, 0);
    const totalReturn = investments.reduce((sum, investment) => {
      if (investment.roi) {
        return sum + (investment.amount * investment.roi / 100);
      }
      return sum;
    }, 0);
    
    const active = investments.filter(inv => inv.status === 'Active').length;
    const completed = investments.filter(inv => inv.status === 'Completed').length;
    const pending = investments.filter(inv => inv.status === 'Pending').length;
    
    return {
      totalInvestment,
      totalReturn,
      averageRoi: totalInvestment ? (totalReturn / totalInvestment * 100) : 0,
      count: investments.length,
      active,
      completed,
      pending,
    };
  }, [investments]);

  return {
    investments: filteredInvestments,
    allInvestments: investments,
    transactions,
    isLoading,
    error,
    updateFilters,
    getInvestment,
    getDistributionByCategory,
    getInvestmentSummary,
    refetch: () => fetchInvestments(filters),
  };
}

import { useState, useEffect } from 'react';

interface InvestorStats {
  totalBids: number;
  activeIdeas: number;
  pendingPitches: number;
  totalInvestment: number;
}

interface UseInvestorStatsOptions {
  initialData?: InvestorStats;
}

export function useInvestorStats(options: UseInvestorStatsOptions = {}) {
  const { initialData } = options;
  
  const [stats, setStats] = useState<InvestorStats>(
    initialData || {
      totalBids: 0,
      activeIdeas: 0,
      pendingPitches: 0,
      totalInvestment: 0,
    }
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Mock data
        const mockStats = {
          totalBids: 24,
          activeIdeas: 12,
          pendingPitches: 6,
          totalInvestment: 360000,
        };
        
        setStats(mockStats);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const refetch = () => {
    // Re-fetch data
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // Mock data
      const mockStats = {
        totalBids: 24,
        activeIdeas: 12,
        pendingPitches: 6,
        totalInvestment: 360000,
      };
      
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  };

  return {
    stats,
    isLoading,
    error,
    refetch,
  };
}

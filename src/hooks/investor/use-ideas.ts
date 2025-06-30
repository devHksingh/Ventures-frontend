import { useState, useEffect, useCallback } from 'react';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  videoType?: 'youtube' | 'mp4';
  founderName: string;
  founderBio: string;
  investmentAmounts: { amount: number; equity: number }[];
  financialProjections: {
    year: number;
    revenue: number;
    expenses: number;
    profit: number;
  }[];
  createdAt: string;
}

interface UseIdeasOptions {
  initialData?: Idea[];
}

interface UseIdeasFilters {
  query?: string;
  category?: string;
  priceRange?: [number, number];
  dateRange?: [Date | null, Date | null];
  page?: number;
  limit?: number;
}

export function useIdeas(options: UseIdeasOptions = {}) {
  const { initialData } = options;
  
  const [ideas, setIdeas] = useState<Idea[]>(initialData || []);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<UseIdeasFilters>({
    page: 1,
    limit: 10,
  });
  const [totalCount, setTotalCount] = useState(0);

  const fetchIdeas = useCallback(async (params: UseIdeasFilters = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock data
      const mockIdeas = [
        {
          id: '1',
          title: 'AI-Powered Sales Analytics Platform',
          description: 'A cutting-edge AI platform that analyzes sales data, predicts customer behavior, and provides actionable insights to boost revenue.',
          category: 'Software',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          videoType: 'youtube' as const,
          founderName: 'Sarah Johnson',
          founderBio: 'Former data scientist at Google with 10+ years of experience in AI and machine learning.',
          investmentAmounts: [
            { amount: 10000, equity: 2 },
            { amount: 25000, equity: 5 },
            { amount: 50000, equity: 10 },
          ],
          financialProjections: [
            { year: 1, revenue: 100000, expenses: 80000, profit: 20000 },
            { year: 2, revenue: 300000, expenses: 150000, profit: 150000 },
            { year: 3, revenue: 750000, expenses: 300000, profit: 450000 },
          ],
          createdAt: '2025-05-20T10:30:00Z',
        },
        {
          id: '2',
          title: 'Sustainable Urban Farming Solution',
          description: 'Vertical farming technology that enables efficient food production in urban environments using 95% less water than traditional farming.',
          category: 'Agriculture',
          imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          videoUrl: 'https://www.youtube.com/watch?v=abcdef123456',
          videoType: 'youtube' as const,
          founderName: 'Michael Chen',
          founderBio: 'Environmental engineer with expertise in sustainable agriculture and urban planning.',
          investmentAmounts: [
            { amount: 15000, equity: 3 },
            { amount: 35000, equity: 7 },
            { amount: 75000, equity: 15 },
          ],
          financialProjections: [
            { year: 1, revenue: 50000, expenses: 70000, profit: -20000 },
            { year: 2, revenue: 150000, expenses: 100000, profit: 50000 },
            { year: 3, revenue: 400000, expenses: 200000, profit: 200000 },
          ],
          createdAt: '2025-05-18T14:15:00Z',
        },
        {
          id: '3',
          title: 'AR-Based Education App',
          description: 'Augmented reality application that transforms traditional learning materials into interactive 3D experiences for K-12 students.',
          category: 'Education',
          imageUrl: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
          founderName: 'Emma Rodriguez',
          founderBio: 'Former educator with experience in EdTech development and curriculum design.',
          investmentAmounts: [
            { amount: 5000, equity: 1.5 },
            { amount: 20000, equity: 6 },
            { amount: 40000, equity: 12 },
          ],
          financialProjections: [
            { year: 1, revenue: 30000, expenses: 50000, profit: -20000 },
            { year: 2, revenue: 120000, expenses: 80000, profit: 40000 },
            { year: 3, revenue: 300000, expenses: 150000, profit: 150000 },
          ],
          createdAt: '2025-05-15T09:45:00Z',
        },
        // Add more mock ideas here
      ];
      
      // Filter ideas based on params
      let filtered = [...mockIdeas];
      
      if (params.query) {
        const query = params.query.toLowerCase();
        filtered = filtered.filter(
          (idea) =>
            idea.title.toLowerCase().includes(query) ||
            idea.description.toLowerCase().includes(query)
        );
      }
      
      if (params.category) {
        filtered = filtered.filter((idea) => idea.category === params.category);
      }
      
      if (params.priceRange) {
        const [min, max] = params.priceRange;
        filtered = filtered.filter((idea) => {
          const minInvestment = idea.investmentAmounts[0]?.amount || 0;
          return minInvestment >= min && minInvestment <= max;
        });
      }
      
      if (params.dateRange) {
        const [start, end] = params.dateRange;
        filtered = filtered.filter((idea) => {
          const ideaDate = new Date(idea.createdAt);
          return (
            (!start || ideaDate >= start) && (!end || ideaDate <= end)
          );
        });
      }
      
      setTotalCount(filtered.length);
      
      // Paginate results
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedIdeas = filtered.slice(startIndex, endIndex);
      
      setIdeas(mockIdeas);
      setFilteredIdeas(paginatedIdeas);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIdeas(filters);
  }, [fetchIdeas, filters]);

  const updateFilters = useCallback((newFilters: UseIdeasFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  }, []);

  const nextPage = useCallback(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: (prevFilters.page || 1) + 1,
    }));
  }, []);

  const prevPage = useCallback(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: Math.max((prevFilters.page || 1) - 1, 1),
    }));
  }, []);

  const getIdea = useCallback(
    (id: string) => {
      return ideas.find((idea) => idea.id === id);
    },
    [ideas]
  );

  return {
    ideas: filteredIdeas,
    allIdeas: ideas,
    isLoading,
    error,
    totalCount,
    page: filters.page || 1,
    limit: filters.limit || 10,
    updateFilters,
    nextPage,
    prevPage,
    getIdea,
    refetch: () => fetchIdeas(filters),
  };
}

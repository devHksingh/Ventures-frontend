import { useState, useEffect } from 'react';
import SearchFilters from '../../../components/investor/startups/search-filters';
import StartupCard, { StartupCardSkeleton } from '../../../components/investor/startups/startup-card';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import { UNIFIED_STARTUPS, getStartupForBrowse } from '../../../data/investor/unified-startups';

// Types - matching the Next.js implementation exactly
interface Startup {
  id: string;
  title: string;
  description: string;
  industry: string;
  imageUrl: string;
  videoUrl?: string;
  videoType?: 'youtube' | 'mp4';
  fundingStage: 'seed' | 'series-a' | 'series-b' | 'series-c' | 'pre-seed';
  fundingNeeded: number;
  currentFunding: number;
  roiProjection: number;
  investmentTimeline: string;
  founderName: string;
  founderBio: string;
  teamMembers: {
    name: string;
    role: string;
    bio: string;
    linkedinUrl?: string;
    imageUrl?: string;
  }[];
  financialProjections: {
    year: number;
    revenue: number;
    expenses: number;
    profit: number;
  }[];
  marketAnalysis: {
    marketSize: string;
    targetMarket: string;
    competitors: string[];
    competitiveAdvantage: string;
  };
  investmentTerms: {
    minimumInvestment: number;
    maximumInvestment: number;
    equityOffered: number;
    useOfFunds: string[];
  };
  riskFactors: string[];
}

interface SearchFilters {
  query: string;
  industry: string;
  fundingStage: string;
  fundingRange: [number, number];
  roiRange: [number, number];
}

// Mock data for demonstration purposes - using unified startups (same as Next.js)
const mockIndustries = [
  'Software',
  'Hardware',
  'AI/ML',
  'Blockchain',
  'Healthcare',
  'Education',
  'Fintech',
  'E-commerce',
  'Sustainable Tech',
  'Agriculture',
  'Biotech',
  'Cybersecurity',
];

// Convert unified startups to browse format
const mockStartups: Startup[] = UNIFIED_STARTUPS.map(getStartupForBrowse);

export default function BrowseStartups() {
  const [isLoading, setIsLoading] = useState(true);
  const [startups] = useState<Startup[]>(mockStartups);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>(mockStartups);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  const handleSearch = (filters: SearchFilters) => {
    const { query, industry, fundingStage, fundingRange, roiRange } = filters;
    
    const filtered = startups.filter((startup) => {
      // Filter by search query
      const matchesQuery = query === '' || 
        startup.title.toLowerCase().includes(query.toLowerCase()) || 
        startup.description.toLowerCase().includes(query.toLowerCase()) ||
        startup.founderName.toLowerCase().includes(query.toLowerCase());
      
      // Filter by industry
      const matchesIndustry = industry === '' || startup.industry === industry;
      
      // Filter by funding stage
      const matchesFundingStage = fundingStage === '' || startup.fundingStage === fundingStage;
      
      // Filter by funding range
      const matchesFundingRange = 
        startup.fundingNeeded >= fundingRange[0] && 
        startup.fundingNeeded <= fundingRange[1];
      
      // Filter by ROI range
      const matchesRoiRange = 
        startup.roiProjection >= roiRange[0] && 
        startup.roiProjection <= roiRange[1];
      
      return matchesQuery && matchesIndustry && matchesFundingStage && matchesFundingRange && matchesRoiRange;
    });
    
    setFilteredStartups(filtered);
  };

  return (
    <>
      <InvestorHeader
        title="Browse Startups"
        subtitle="Discover and invest in promising startups from innovative entrepreneurs seeking funding."
      />

      <SearchFilters
        onSearch={handleSearch}
        industries={mockIndustries}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <StartupCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredStartups.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No startups found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search filters to find investment opportunities that match your criteria.
          </p>
        </div>
      ) : (        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <StartupCard
              key={startup.id}
              startup={{
                id: startup.id,
                title: startup.title,
                description: startup.description,
                industry: startup.industry,
                imageUrl: startup.imageUrl,
                fundingStage: startup.fundingStage,
                fundingNeeded: startup.fundingNeeded,
                currentFunding: startup.currentFunding,
                roiProjection: startup.roiProjection,
                investmentTimeline: startup.investmentTimeline,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

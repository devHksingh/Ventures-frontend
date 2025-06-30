import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InvestorHeader from '../../components/layouts/investor/investor-header';
import StatsCards from '../../components/investor/dashboard/stats-cards';
import DealFlowWidget from '../../components/investor/dashboard/deal-flow-widget';
import PortfolioWidget from '../../components/investor/dashboard/portfolio-widget';
import PortfolioPerformanceWidget from '../../components/investor/dashboard/portfolio-performance-widget';
import PerformanceInsightsWidget from '../../components/investor/dashboard/performance-insights-widget';
import BidStatusWidget from '../../components/investor/dashboard/bid-status-widget';
import MarketInsightsWidget from '../../components/investor/dashboard/market-insights-widget';

// Mock data for investor-focused dashboard
const mockInvestorStats = {
  totalInvested: 485000,
  activeInvestments: 12,
  pendingBids: 3,
  portfolioValue: 742000,
  monthlyReturn: 3.2,
  annualizedReturn: 22.8,
  sharpeRatio: 1.42,
  totalGainLoss: 257000,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats] = useState(mockInvestorStats);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const headerActions = (
    <>
      <button 
        onClick={() => {
          // TODO: Implement export functionality
          console.log('Exporting portfolio report...');
          alert('Portfolio report export feature coming soon!');
        }}
        className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
      >
        Export Report
      </button>
      <button 
        onClick={() => navigate('/investor/browse-startups')}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        Browse Startups
      </button>
    </>
  );

  return (
    <>
      <InvestorHeader 
        title="Investment Dashboard" 
        subtitle="Monitor your portfolio performance, track active bids, and discover new opportunities."
        actions={headerActions}
      />
      
      <div className="p-6">
        <StatsCards isLoading={isLoading} stats={stats} />
        
        {/* Portfolio Performance Section - Full Width */}
        <div className="mt-8">
          <PortfolioPerformanceWidget isLoading={isLoading} />
        </div>
        
        {/* Performance Insights */}
        <div className="mt-6">
          <PerformanceInsightsWidget isLoading={isLoading} />
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          <div className="space-y-6">
            <PortfolioWidget isLoading={isLoading} />
            <BidStatusWidget isLoading={isLoading} />
          </div>
          <div className="space-y-6">
            <DealFlowWidget isLoading={isLoading} />
            <MarketInsightsWidget isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
}

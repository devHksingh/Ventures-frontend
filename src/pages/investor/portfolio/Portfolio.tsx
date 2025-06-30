import { Link } from 'react-router-dom';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import PortfolioOverview from '../../../components/investor/portfolio/portfolio-overview';
import PortfolioCharts from '../../../components/investor/portfolio/portfolio-charts';
import { usePortfolio } from '../../../hooks/investor/portfolio/use-portfolio';

export default function Portfolio() {
  const { portfolio, isLoading, error } = usePortfolio();
  
  if (error) {
    return (
      <>
        <InvestorHeader 
          title="Portfolio Error"
          subtitle="Unable to load portfolio data"
        />
        <div className="p-6">
          <div className="text-red-500">Error loading portfolio: {error.message}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <InvestorHeader 
        title="Portfolio Overview"
        subtitle="Comprehensive view of your investment portfolio"
      />
      <div className="p-6">
        {/* Portfolio Summary Cards */}
        <PortfolioOverview 
          portfolio={portfolio} 
          isLoading={isLoading} 
        />

        {/* Portfolio Performance Charts */}
        <div className="mt-8">
          <PortfolioCharts 
            portfolio={portfolio} 
            isLoading={isLoading} 
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/investor/portfolio/performance" className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg border border-blue-200 transition-colors">
            <h3 className="font-semibold text-blue-900 mb-2">Performance Analytics</h3>
            <p className="text-blue-700 text-sm">View detailed ROI and performance metrics</p>
          </Link>
          <Link to="/investor/portfolio/analytics" className="bg-green-50 hover:bg-green-100 p-6 rounded-lg border border-green-200 transition-colors">
            <h3 className="font-semibold text-green-900 mb-2">Investment Analytics</h3>
            <p className="text-green-700 text-sm">Deep dive into investment analytics dashboard</p>
          </Link>
          <Link to="/investor/browse-startups" className="bg-purple-50 hover:bg-purple-100 p-6 rounded-lg border border-purple-200 transition-colors">
            <h3 className="font-semibold text-purple-900 mb-2">Discover Opportunities</h3>
            <p className="text-purple-700 text-sm">Browse new startup investment opportunities</p>
          </Link>
        </div>
      </div>
    </>
  );
}

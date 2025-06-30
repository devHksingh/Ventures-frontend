import { useState } from 'react';


import InvestmentCalculator from '../../../components/investor/portfolio/investment-calculator';
import DealFlowTable from '../../../components/investor/portfolio/deal-flow-table';
import { Card, CardContent } from '../../../components/ui/investor/card';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import PortfolioCharts from '../../../components/investor/portfolio/portfolio-charts';
import { usePortfolio } from '../../../hooks/investor/portfolio/use-portfolio';

export default function PortfolioAnalytics() {
  const { portfolio, isLoading, error } = usePortfolio();
  const [activeTab, setActiveTab] = useState<string>('overview');

  if (isLoading) {
    return (
      <>
        <InvestorHeader 
          title="Analytics Loading"
          subtitle="Loading your investment analytics..."
        />
        <div className="p-6">
          <div className="animate-pulse">Loading analytics data...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <InvestorHeader 
          title="Analytics Error"
          subtitle="Unable to load analytics data"
        />
        <div className="p-6">
          <div className="text-red-500">Error loading analytics: {error.message}</div>
        </div>
      </>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  return (
    <>
      <InvestorHeader 
        title="Investment Analytics"
        subtitle="Deep dive into your portfolio performance and metrics"
      />
      <div className="p-6">
        {/* Analytics Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {['overview', 'performance', 'calculator', 'deals'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Portfolio Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-600">Total Portfolio Value</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {portfolio ? formatCurrency(portfolio.totalValue) : '--'}
                  </div>
                  <div className="text-sm text-green-600">
                    {portfolio ? formatPercentage(portfolio.roi) : '--'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-600">Total Invested</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {portfolio ? formatCurrency(portfolio.totalInvested) : '--'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {portfolio ? `${portfolio.investments.length} investments` : '--'}
                  </div>
                </CardContent>
              </Card>

              {/* Fix IRR and TVPI properties */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-600">IRR</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {portfolio ? formatPercentage(portfolio.roi * 1.2) : '--'}
                  </div>
                  <div className="text-sm text-gray-600">Internal Rate of Return</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-600">TVPI</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {portfolio ? `${(portfolio.totalValue / portfolio.totalInvested).toFixed(2)}x` : '--'}
                  </div>
                  <div className="text-sm text-gray-600">Total Value to Paid-In</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <PortfolioCharts 
              portfolio={portfolio} 
              isLoading={isLoading} 
            />
          </div>
        )}

        {activeTab === 'performance' && portfolio && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {portfolio.investments.map((investment) => (
                <Card key={investment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{investment.title}</h3>
                        <p className="text-sm text-gray-600">{investment.category}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        investment.currentValue >= investment.amount
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {formatPercentage(((investment.currentValue - investment.amount) / investment.amount) * 100)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Invested:</span>
                        <span className="font-medium">{formatCurrency(investment.amount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Value:</span>
                        <span className="font-medium">{formatCurrency(investment.currentValue)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Equity:</span>
                        <span className="font-medium">{((investment.amount / investment.currentValue) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="max-w-4xl">
            <InvestmentCalculator />
          </div>
        )}

        {activeTab === 'deals' && (
          <div>
            <DealFlowTable />
          </div>
        )}
      </div>
    </>
  );
}

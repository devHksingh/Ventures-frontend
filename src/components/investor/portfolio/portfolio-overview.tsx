import React from 'react';
import { Card, CardContent } from '../../ui/investor/card';
import type { Portfolio } from '../../../hooks/investor/portfolio/use-portfolio';

interface PortfolioOverviewProps {
  portfolio: Portfolio | null;
  isLoading: boolean;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ portfolio, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No portfolio data available</p>
      </div>
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

  const getROIColor = (roi: number) => {
    if (roi > 0) return 'text-green-600';
    if (roi < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Portfolio Value */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(portfolio.totalValue)}</p>
              <p className="text-xs text-blue-700 mt-1">
                {portfolio.investments.length} active investments
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Invested */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(portfolio.totalInvested)}</p>
              <p className="text-xs text-purple-700 mt-1">
                Capital deployed
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Gains/Losses */}
      <Card className={`bg-gradient-to-br ${portfolio.totalGains > portfolio.totalLosses ? 'from-green-50 to-green-100 border-green-200' : 'from-red-50 to-red-100 border-red-200'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${portfolio.totalGains > portfolio.totalLosses ? 'text-green-600' : 'text-red-600'}`}>
                {portfolio.totalGains > portfolio.totalLosses ? 'Total Gains' : 'Total Losses'}
              </p>
              <p className={`text-2xl font-bold ${portfolio.totalGains > portfolio.totalLosses ? 'text-green-900' : 'text-red-900'}`}>
                {formatCurrency(Math.abs(portfolio.totalValue - portfolio.totalInvested))}
              </p>
              <p className={`text-xs mt-1 ${portfolio.totalGains > portfolio.totalLosses ? 'text-green-700' : 'text-red-700'}`}>
                Unrealized {portfolio.totalGains > portfolio.totalLosses ? 'gains' : 'losses'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${portfolio.totalGains > portfolio.totalLosses ? 'bg-green-200' : 'bg-red-200'}`}>
              <svg className={`w-6 h-6 ${portfolio.totalGains > portfolio.totalLosses ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {portfolio.totalGains > portfolio.totalLosses ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                )}
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI */}
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600 mb-1">Portfolio ROI</p>
              <p className={`text-2xl font-bold ${getROIColor(portfolio.roi)} mb-1`}>
                {formatPercentage(portfolio.roi)}
              </p>
              <p className="text-xs text-amber-700">
                Return on investment
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioOverview;

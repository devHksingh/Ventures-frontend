import { useNavigate } from 'react-router-dom';

interface MarketTrend {
  category: string;
  growth: number;
  totalFunding: number;
  dealCount: number;
  avgValuation: number;
}

interface MarketInsight {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'opportunity' | 'alert';
  impact: 'high' | 'medium' | 'low';
  date: string;
}

interface MarketInsightsWidgetProps {
  isLoading?: boolean;
}

const mockTrends: MarketTrend[] = [
  {
    category: 'AI/ML',
    growth: 45.2,
    totalFunding: 2800000000,
    dealCount: 234,
    avgValuation: 12000000,
  },
  {
    category: 'FinTech',
    growth: 23.8,
    totalFunding: 1900000000,
    dealCount: 189,
    avgValuation: 10000000,
  },
  {
    category: 'HealthTech',
    growth: 38.7,
    totalFunding: 1500000000,
    dealCount: 156,
    avgValuation: 9600000,
  },
];

const mockInsights: MarketInsight[] = [
  {
    id: '1',
    title: 'AI Chip Startups Surge',
    description: 'Semiconductor AI startups seeing 3x increase in funding rounds compared to last quarter.',
    type: 'opportunity',
    impact: 'high',
    date: '2025-05-30',
  },
  {
    id: '2',
    title: 'RegTech Market Expansion',
    description: 'Regulatory technology solutions experiencing accelerated adoption across financial institutions.',
    type: 'trend',
    impact: 'medium',
    date: '2025-05-28',
  },
  {
    id: '3',
    title: 'Climate Tech Valuations Peak',
    description: 'Carbon capture and clean energy valuations may be reaching unsustainable levels.',
    type: 'alert',
    impact: 'medium',
    date: '2025-05-25',
  },
];

export default function MarketInsightsWidget({ isLoading = false }: MarketInsightsWidgetProps) {
  const navigate = useNavigate();
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01.293.707V12a1 1 0 102 0V9a1 1 0 01.293-.707L13.586 6H12a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293A1 1 0 0112 9v3a3 3 0 11-6 0V8.707L3.707 6.414A1 1 0 013 6V4z" clipRule="evenodd" />
          </svg>
        );
      case 'trend':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.414 14.586 7H12z" clipRule="evenodd" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getInsightColor = (type: string) => {
    const baseColors = {
      opportunity: 'from-green-500 to-emerald-600',
      trend: 'from-blue-500 to-indigo-600',
      alert: 'from-orange-500 to-red-600',
    };
    
    const textColors = {
      opportunity: 'text-green-700',
      trend: 'text-blue-700',
      alert: 'text-orange-700',
    };

    const bgColors = {
      opportunity: 'bg-green-50 border-green-200',
      trend: 'bg-blue-50 border-blue-200',
      alert: 'bg-orange-50 border-orange-200',
    };

    return {
      gradient: baseColors[type as keyof typeof baseColors] || baseColors.trend,
      text: textColors[type as keyof typeof textColors] || textColors.trend,
      bg: bgColors[type as keyof typeof bgColors] || bgColors.trend,
    };
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return colors[impact as keyof typeof colors] || colors.medium;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-6 w-16 bg-yellow-200 rounded-full animate-pulse"></div>
        </div>
        
        {/* Trends */}
        <div className="mb-6">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
          {[1, 2].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Market Insights</h3>
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            PRO
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Market Trends */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Top Growing Sectors (Q2 2025)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockTrends.map((trend) => (
              <div key={trend.category} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{trend.category}</h5>
                  <span className={`text-sm font-medium ${trend.growth > 30 ? 'text-green-600' : trend.growth > 20 ? 'text-blue-600' : 'text-gray-600'}`}>
                    +{trend.growth}%
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Funding:</span>
                    <span className="font-medium">{formatCurrency(trend.totalFunding)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deals:</span>
                    <span className="font-medium">{trend.dealCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Valuation:</span>
                    <span className="font-medium">{formatCurrency(trend.avgValuation)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Key Insights & Alerts</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {mockInsights.map((insight) => {
              const colors = getInsightColor(insight.type);
              return (
                <div key={insight.id} className={`rounded-lg p-4 border ${colors.bg} hover:shadow-md transition-shadow cursor-pointer`}>
                  <div className="flex items-start space-x-3">
                    <div className={`h-10 w-10 bg-gradient-to-r ${colors.gradient} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className={`font-medium ${colors.text}`}>{insight.title}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactBadge(insight.impact)}`}>
                          {insight.impact}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(insight.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>                        <button 
                          onClick={() => {
                            // TODO: Implement learn more functionality
                            console.log('Opening insight details...');
                            alert('Detailed market insights available in Pro version!');
                          }}
                          className={`text-xs font-medium ${colors.text} hover:underline`}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium CTA */}
        <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900 mb-1">Unlock Advanced Analytics</h5>
              <p className="text-sm text-gray-600">Get detailed market reports, predictive trends, and personalized investment recommendations.</p>
            </div>            
            <button 
                    onClick={() => navigate(`/investor/market-insights`)}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium rounded-md hover:from-yellow-600 hover:to-orange-600 transition-colors flex-shrink-0 ml-4"
                    >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

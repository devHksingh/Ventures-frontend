import { Card, CardContent } from '../../ui/investor/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  isLoading = false,
}: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <div className="p-2 bg-blue-50 rounded-md">{icon}</div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
              {trend && (
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {trend.isPositive ? '+' : ''}
                    {trend.value}%
                  </span>
                  <svg
                    className={`h-4 w-4 ml-1 ${
                      trend.isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        trend.isPositive
                          ? 'M13 7l5 5m0 0l-5 5m5-5H6'
                          : 'M11 17l-5-5m0 0l5-5m-5 5h12'
                      }
                      transform={
                        trend.isPositive ? '' : 'rotate(90 12 12)'
                      }
                    />
                  </svg>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  isLoading?: boolean;  stats?: {
    totalInvested?: number;
    activeInvestments?: number;
    pendingBids?: number;
    portfolioValue?: number;
    monthlyReturn?: number;
    annualizedReturn?: number;
    sharpeRatio?: number;
    totalGainLoss?: number;
    // Legacy startup-focused stats for backward compatibility
    totalBids?: number;
    activeIdeas?: number;
    pendingPitches?: number;
    totalInvestment?: number;
  };
}

export default function StatsCards({
  isLoading = false,
  stats = {},
}: StatsCardsProps) {
  // Check if this is investor-focused stats or legacy startup stats
  const isInvestorStats = 'totalInvested' in stats || 'activeInvestments' in stats;
  
  if (isInvestorStats) {    const investorStats = {
      totalInvested: stats.totalInvested || 0,
      activeInvestments: stats.activeInvestments || 0,
      pendingBids: stats.pendingBids || 0,
      portfolioValue: stats.portfolioValue || 0,
      monthlyReturn: stats.monthlyReturn || 0,
      annualizedReturn: stats.annualizedReturn || 0,
      sharpeRatio: stats.sharpeRatio || 0,
      totalGainLoss: stats.totalGainLoss || 0,
    };

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Gain/Loss"
          value={`$${investorStats.totalGainLoss.toLocaleString()}`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-emerald-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          }
          trend={{ value: investorStats.monthlyReturn, isPositive: investorStats.monthlyReturn >= 0 }}
          isLoading={isLoading}
        />
        <StatsCard
          title="Portfolio Value"
          value={`$${investorStats.portfolioValue.toLocaleString()}`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          }
          trend={{ value: investorStats.annualizedReturn, isPositive: investorStats.annualizedReturn >= 0 }}
          isLoading={isLoading}
        />
        <StatsCard
          title="Active Investments"
          value={investorStats.activeInvestments}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zM6 7a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          }
          trend={{ value: 8.5, isPositive: true }}
          isLoading={isLoading}
        />
        <StatsCard
          title="Sharpe Ratio"
          value={investorStats.sharpeRatio.toFixed(2)}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          }
          trend={{ value: 12.3, isPositive: true }}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Legacy startup-focused stats
  const legacyStats = {
    totalBids: stats.totalBids || 0,
    activeIdeas: stats.activeIdeas || 0,
    pendingPitches: stats.pendingPitches || 0,
    totalInvestment: stats.totalInvestment || 0,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard
        title="Total Bids"
        value={legacyStats.totalBids}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
              clipRule="evenodd"
            />
          </svg>
        }
        isLoading={isLoading}
      />
      <StatsCard
        title="Active Ideas"
        value={legacyStats.activeIdeas}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm1-4a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            />
          </svg>
        }
        trend={{ value: 12.5, isPositive: true }}
        isLoading={isLoading}
      />
      <StatsCard
        title="Pending Pitches"
        value={legacyStats.pendingPitches}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        }
        isLoading={isLoading}
      />
      <StatsCard
        title="Total Investment"
        value={`$${legacyStats.totalInvestment.toLocaleString()}`}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        }
        trend={{ value: 8.2, isPositive: true }}
        isLoading={isLoading}
      />
    </div>
  );
}

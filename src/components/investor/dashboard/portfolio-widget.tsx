
import { useNavigate } from 'react-router-dom';

interface Investment {
  id: string;
  companyName: string;
  category: string;
  investmentAmount: number;
  currentValuation: number;
  investmentDate: string;
  stage: string;
  status: 'active' | 'exited' | 'closed';
  roi: number;
}

interface PortfolioWidgetProps {
  isLoading?: boolean;
}

const mockInvestments: Investment[] = [
  {
    id: '1',
    companyName: 'TechFlow Inc.',
    category: 'SaaS',
    investmentAmount: 50000,
    currentValuation: 85000,
    investmentDate: '2024-03-15',
    stage: 'Series A',
    status: 'active',
    roi: 70,
  },
  {
    id: '2',
    companyName: 'GreenEnergy Solutions',
    category: 'CleanTech',
    investmentAmount: 75000,
    currentValuation: 120000,
    investmentDate: '2024-01-20',
    stage: 'Series B',
    status: 'active',
    roi: 60,
  },
  {
    id: '3',
    companyName: 'HealthTech Pro',
    category: 'HealthTech',
    investmentAmount: 30000,
    currentValuation: 25000,
    investmentDate: '2024-05-10',
    stage: 'Seed',
    status: 'active',
    roi: -16.7,
  },
  {
    id: '4',
    companyName: 'DataMine Analytics',
    category: 'AI/ML',
    investmentAmount: 100000,
    currentValuation: 180000,
    investmentDate: '2023-11-05',
    stage: 'Series A',
    status: 'exited',
    roi: 80,
  },
];

export default function PortfolioWidget({ isLoading = false }: PortfolioWidgetProps) {
  const navigate = useNavigate();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'exited':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoiColor = (roi: number) => {
    if (roi > 0) return 'text-green-600';
    if (roi < 0) return 'text-red-600';
    return 'text-gray-600';
  };
  const totalInvestment = mockInvestments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
  const totalCurrentValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValuation, 0);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        
        {/* Chart placeholder */}
        <div className="h-48 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
        
        {/* Table */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Portfolio Holdings</h3>
          <button 
            onClick={() => navigate('/investor/portfolio')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All Holdings
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Summary Cards */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">          {/* Total Invested Card */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div className="h-6 w-0.5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Total Invested</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvestment)}</p>
                <div className="flex items-center space-x-1">
                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                  <p className="text-xs text-gray-500">Principal amount</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Value Card */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="h-6 w-0.5 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"></div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Current Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCurrentValue)}</p>
                <div className="flex items-center space-x-1">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-gray-500">
                    +{(((totalCurrentValue - totalInvestment) / totalInvestment) * 100).toFixed(1)}% gain
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Holdings Card */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="h-6 w-0.5 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"></div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Active Holdings</p>
                <div className="flex items-baseline space-x-1">
                  <p className="text-2xl font-bold text-gray-900">{mockInvestments.filter(inv => inv.status === 'active').length}</p>
                  <p className="text-sm font-medium text-gray-600">companies</p>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-1.5 w-1.5 bg-purple-500 rounded-full"></div>
                  <p className="text-xs text-gray-500">Portfolio diversity</p>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Portfolio Diversification */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Portfolio Diversification</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { category: 'SaaS', percentage: 35, color: 'bg-blue-500' },
              { category: 'HealthTech', percentage: 25, color: 'bg-green-500' },
              { category: 'FinTech', percentage: 20, color: 'bg-purple-500' },
              { category: 'Others', percentage: 20, color: 'bg-gray-500' }
            ].map((item) => (
              <div key={item.category} className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div className={`w-3 h-3 ${item.color} rounded-full mr-2`}></div>
                  <span className="text-xs font-medium text-gray-700">{item.category}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Investments */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Investments</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {mockInvestments.slice(0, 4).map((investment) => (
              <div key={investment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {investment.companyName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm">{investment.companyName}</h5>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{investment.category}</span>
                      <span>•</span>
                      <span>{investment.stage}</span>
                      <span>•</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                        {investment.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">{formatCurrency(investment.investmentAmount)}</p>
                  <p className={`text-xs font-medium ${getRoiColor(investment.roi)}`}>
                    {investment.roi > 0 ? '+' : ''}{investment.roi}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

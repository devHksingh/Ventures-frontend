import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../ui/investor/card';
import type { Portfolio } from '../../../hooks/investor/portfolio/use-portfolio';

interface InvestmentPerformanceProps {
  portfolio: Portfolio | null;
  isLoading: boolean;
}

const InvestmentPerformance: React.FC<InvestmentPerformanceProps> = ({ portfolio, isLoading }) => {
  const [sortBy, setSortBy] = useState<'roi' | 'amount' | 'date'>('roi');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-6 bg-gray-200 rounded mb-2 w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!portfolio || portfolio.investments.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No investments to display</p>
        </CardContent>
      </Card>
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const sortedInvestments = [...portfolio.investments].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sortBy) {
      case 'roi':
        aValue = a.roi || 0;
        bValue = b.roi || 0;
        break;
      case 'amount':
        aValue = a.currentValue;
        bValue = b.currentValue;
        break;
      case 'date':
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      default:
        return 0;
    }

    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const handleSort = (newSortBy: 'roi' | 'amount' | 'date') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Sort Controls */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <button
          onClick={() => handleSort('roi')}
          className={`px-3 py-1 text-sm rounded ${
            sortBy === 'roi' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ROI {sortBy === 'roi' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
        <button
          onClick={() => handleSort('amount')}
          className={`px-3 py-1 text-sm rounded ${
            sortBy === 'amount' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Value {sortBy === 'amount' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
        <button
          onClick={() => handleSort('date')}
          className={`px-3 py-1 text-sm rounded ${
            sortBy === 'date' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Date {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
      </div>      {/* Investment List */}
      {sortedInvestments.map((investment) => (
        <Card key={investment.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <img
                src={investment.imageUrl}
                alt={investment.title}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
          
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <Link to={`/investor/portfolio/${investment.id}`} className="hover:text-blue-600">
                        {investment.title}
                      </Link>
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                        {investment.status}
                      </span>
                      <span className="text-sm text-gray-600">{investment.category}</span>
                      <span className={`text-sm font-medium ${getRiskColor(investment.riskLevel)}`}>
                        {investment.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Invested</p>
                    <p className="text-lg font-semibold">{formatCurrency(investment.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current Value</p>
                    <p className="text-lg font-semibold">{formatCurrency(investment.currentValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ROI</p>
                    <p className={`text-lg font-semibold ${(investment.roi || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(investment.roi || 0)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div>
                    <span>Gain/Loss: </span>
                    <span className={investment.currentValue >= investment.amount ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(investment.currentValue - investment.amount)}
                    </span>
                  </div>
                  <div>
                    <span>Projected ROI: </span>
                    <span className="text-blue-600">
                      {formatPercentage(investment.projectedROI || 0)}
                    </span>
                  </div>                </div>
              </div>
            </div>
              
              {/* Progress Bar for ROI */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Performance vs Projection</span>
                  <span>{((investment.roi || 0) / (investment.projectedROI || 1) * 100).toFixed(0)}% of target</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (investment.roi || 0) >= (investment.projectedROI || 0) 
                        ? 'bg-green-500' 
                        : (investment.roi || 0) >= 0 
                        ? 'bg-blue-500' 
                        : 'bg-red-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(0, ((investment.roi || 0) / (investment.projectedROI || 1)) * 100))}%`
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
      ))}
    </div>
  );
};

export default InvestmentPerformance;

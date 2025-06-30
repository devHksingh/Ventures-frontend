import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/investor/card';
import { Button } from '../../ui/investor/button';

interface DealFlowOpportunity {
  id: string;
  companyName: string;
  category: string;
  fundingStage: string;
  targetAmount: number;
  currentFunding: number;
  minimumInvestment: number;
  valuation: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedROI: number;
  timeToExit: string;
  description: string;
  imageUrl: string;
  teamSize: number;
  founded: string;
}

const DealFlowTable: React.FC = () => {
  const [sortBy, setSortBy] = useState<'expectedROI' | 'valuation' | 'targetAmount'>('expectedROI');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterRisk, setFilterRisk] = useState<string>('');

  // Mock deal flow data
  const dealFlowData: DealFlowOpportunity[] = [
    {
      id: 'df1',
      companyName: 'EcoLogistics AI',
      category: 'Logistics',
      fundingStage: 'Series A',
      targetAmount: 2000000,
      currentFunding: 1200000,
      minimumInvestment: 25000,
      valuation: 8000000,
      riskLevel: 'Medium',
      expectedROI: 18.5,
      timeToExit: '3-5 years',
      description: 'AI-powered supply chain optimization for sustainable logistics',
      imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      teamSize: 12,
      founded: '2023'
    },
    {
      id: 'df2',
      companyName: 'MedTech Innovations',
      category: 'Healthcare',
      fundingStage: 'Seed',
      targetAmount: 500000,
      currentFunding: 300000,
      minimumInvestment: 10000,
      valuation: 2500000,
      riskLevel: 'High',
      expectedROI: 25.0,
      timeToExit: '5-7 years',
      description: 'Next-generation portable diagnostic devices for remote healthcare',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80',
      teamSize: 8,
      founded: '2024'
    },
    {
      id: 'df3',
      companyName: 'FinanceFlow Pro',
      category: 'Fintech',
      fundingStage: 'Series B',
      targetAmount: 5000000,
      currentFunding: 3500000,
      minimumInvestment: 50000,
      valuation: 20000000,
      riskLevel: 'Low',
      expectedROI: 12.8,
      timeToExit: '2-3 years',
      description: 'Enterprise financial management platform with AI insights',
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      teamSize: 25,
      founded: '2022'
    },
    {
      id: 'df4',
      companyName: 'GreenEnergy Solutions',
      category: 'Energy',
      fundingStage: 'Series A',
      targetAmount: 3000000,
      currentFunding: 1800000,
      minimumInvestment: 30000,
      valuation: 12000000,
      riskLevel: 'Medium',
      expectedROI: 16.2,
      timeToExit: '4-6 years',
      description: 'Smart grid technology for renewable energy optimization',
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      teamSize: 18,
      founded: '2023'
    },
    {
      id: 'df5',
      companyName: 'EduTech Academy',
      category: 'Education',
      fundingStage: 'Seed',
      targetAmount: 750000,
      currentFunding: 400000,
      minimumInvestment: 15000,
      valuation: 3000000,
      riskLevel: 'High',
      expectedROI: 22.0,
      timeToExit: '4-5 years',
      description: 'Virtual reality platform for immersive learning experiences',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80',
      teamSize: 15,
      founded: '2024'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Seed': return 'bg-blue-100 text-blue-800';
      case 'Series A': return 'bg-purple-100 text-purple-800';
      case 'Series B': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and sort logic
  let filteredData = dealFlowData;
  
  if (filterCategory) {
    filteredData = filteredData.filter(deal => deal.category === filterCategory);
  }
  
  if (filterRisk) {
    filteredData = filteredData.filter(deal => deal.riskLevel === filterRisk);
  }

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sortBy) {
      case 'expectedROI':
        aValue = a.expectedROI;
        bValue = b.expectedROI;
        break;
      case 'valuation':
        aValue = a.valuation;
        bValue = b.valuation;
        break;
      case 'targetAmount':
        aValue = a.targetAmount;
        bValue = b.targetAmount;
        break;
      default:
        return 0;
    }

    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const handleSort = (newSortBy: 'expectedROI' | 'valuation' | 'targetAmount') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100);
  };

  const categories = [...new Set(dealFlowData.map(deal => deal.category))];
  const riskLevels = ['Low', 'Medium', 'High'];

  return (
    <div className="space-y-6">
      {/* Filters and Sort Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Risk:</label>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="">All Risk Levels</option>
                {riskLevels.map(risk => (
                  <option key={risk} value={risk}>{risk}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <button
                onClick={() => handleSort('expectedROI')}
                className={`px-3 py-1 text-sm rounded ${
                  sortBy === 'expectedROI' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Expected ROI {sortBy === 'expectedROI' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button
                onClick={() => handleSort('valuation')}
                className={`px-3 py-1 text-sm rounded ${
                  sortBy === 'valuation' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Valuation {sortBy === 'valuation' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button
                onClick={() => handleSort('targetAmount')}
                className={`px-3 py-1 text-sm rounded ${
                  sortBy === 'targetAmount' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Target Amount {sortBy === 'targetAmount' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deal Flow Table */}
      <div className="space-y-4">
        {sortedData.map((deal) => (
          <Card key={deal.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <img
                  src={deal.imageUrl}
                  alt={deal.companyName}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{deal.companyName}</h3>
                      <p className="text-gray-600 text-sm mb-2">{deal.description}</p>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(deal.fundingStage)}`}>
                          {deal.fundingStage}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(deal.riskLevel)}`}>
                          {deal.riskLevel} Risk
                        </span>
                        <span className="text-sm text-gray-600">{deal.category}</span>
                        <span className="text-sm text-gray-600">Team: {deal.teamSize}</span>
                        <span className="text-sm text-gray-600">Founded: {deal.founded}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Target Amount</p>
                      <p className="font-semibold">{formatCurrency(deal.targetAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Valuation</p>
                      <p className="font-semibold">{formatCurrency(deal.valuation)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Min Investment</p>
                      <p className="font-semibold">{formatCurrency(deal.minimumInvestment)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Expected ROI</p>
                      <p className="font-semibold text-green-600">{formatPercentage(deal.expectedROI)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Time to Exit</p>
                      <p className="font-semibold">{deal.timeToExit}</p>
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Funding Progress</span>
                      <span>{formatCurrency(deal.currentFunding)} of {formatCurrency(deal.targetAmount)} ({getProgressPercentage(deal.currentFunding, deal.targetAmount).toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${getProgressPercentage(deal.currentFunding, deal.targetAmount)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                      View Details
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                      Invest Now
                    </Button>
                    <Button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2">
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedData.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No investment opportunities match your current filters.</p>
            <Button 
              onClick={() => {
                setFilterCategory('');
                setFilterRisk('');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DealFlowTable;

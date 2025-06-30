import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Startup {
  id: string;
  name: string;
  category: string;
  stage: string;
  fundingGoal: number;
  raised: number;
  valuation: number;
  description: string;
  location: string;
  teamSize: number;
  logo?: string;
}

interface DealFlowWidgetProps {
  isLoading?: boolean;
}

const mockStartups: Startup[] = [
  {
    id: '1',
    name: 'EcoTech Solutions',
    category: 'CleanTech',
    stage: 'Series A',
    fundingGoal: 2000000,
    raised: 1200000,
    valuation: 8000000,
    description: 'Revolutionary solar panel technology with 40% higher efficiency',
    location: 'San Francisco, CA',
    teamSize: 12,
  },
  {
    id: '2',
    name: 'HealthAI Labs',
    category: 'HealthTech',
    stage: 'Seed',
    fundingGoal: 1500000,
    raised: 800000,
    valuation: 5000000,
    description: 'AI-powered early disease detection using smartphone cameras',
    location: 'Boston, MA',
    teamSize: 8,
  },
  {
    id: '3',
    name: 'FinSecure',
    category: 'FinTech',
    stage: 'Series B',
    fundingGoal: 5000000,
    raised: 3200000,
    valuation: 25000000,
    description: 'Blockchain-based identity verification for financial institutions',
    location: 'New York, NY',
    teamSize: 25,
  },
];

export default function DealFlowWidget({ isLoading = false }: DealFlowWidgetProps) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');

  const categories = ['All', 'CleanTech', 'HealthTech', 'FinTech', 'EdTech', 'AI/ML'];
  const stages = ['All', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+'];

  const filteredStartups = mockStartups.filter(startup => {
    const categoryMatch = selectedCategory === 'All' || startup.category === selectedCategory;
    const stageMatch = selectedStage === 'All' || startup.stage === selectedStage;
    return categoryMatch && stageMatch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-10 w-20 bg-gray-200 rounded"></div>
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Deal Flow</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium" onClick={() => navigate('/investor/browse-startups')}>
            View All
          </button>
        </div>
          {/* Filters */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredStartups.map((startup) => (
            <div key={startup.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                      {startup.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{startup.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{startup.category}</span>
                        <span>•</span>
                        <span>{startup.stage}</span>
                        <span>•</span>
                        <span>{startup.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{startup.description}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {formatCurrency(startup.raised)} raised of {formatCurrency(startup.fundingGoal)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {getProgressPercentage(startup.raised, startup.fundingGoal).toFixed(0)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(startup.raised, startup.fundingGoal)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Valuation: {formatCurrency(startup.valuation)}</span>
                    <span>{startup.teamSize} team members</span>
                  </div>
                </div>
                  <div className="ml-4 flex flex-col space-y-2">                  
                    <button 
                    onClick={() => navigate(`/investor/browse-startups/${startup.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => {
                      // TODO: Implement bookmark functionality
                      console.log('Bookmarking startup:', startup.id);
                      alert('Startup bookmarked successfully!');
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Bookmark
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredStartups.length === 0 && (
          <div className="text-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <p className="text-gray-500">No startups match your current filters</p>
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStage('All');
              }}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

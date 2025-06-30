import { useNavigate } from 'react-router-dom';

interface Bid {
  id: string;
  companyName: string;
  category: string;
  bidAmount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'counter-offered';
  submittedDate: string;
  responseDate?: string;
  equity: number;
  valuation: number;
  description: string;
}

interface BidStatusWidgetProps {
  isLoading?: boolean;
}

const mockBids: Bid[] = [
  {
    id: '1',
    companyName: 'NeuralTech AI',
    category: 'AI/ML',
    bidAmount: 150000,
    status: 'pending',
    submittedDate: '2025-05-28',
    equity: 8.5,
    valuation: 1800000,
    description: 'Advanced neural network platform for enterprise automation',
  },
  {
    id: '2',
    companyName: 'BioGenix Labs',
    category: 'BioTech',
    bidAmount: 200000,
    status: 'counter-offered',
    submittedDate: '2025-05-25',
    responseDate: '2025-05-30',
    equity: 6.0,
    valuation: 3500000,
    description: 'Gene therapy solutions for rare diseases',
  },
  {
    id: '3',
    companyName: 'QuantumSecure',
    category: 'CyberSecurity',
    bidAmount: 100000,
    status: 'accepted',
    submittedDate: '2025-05-20',
    responseDate: '2025-05-25',
    equity: 5.5,
    valuation: 1800000,
    description: 'Quantum encryption for enterprise data protection',
  },
  {
    id: '4',
    companyName: 'EcoTransport',
    category: 'CleanTech',
    bidAmount: 80000,
    status: 'rejected',
    submittedDate: '2025-05-15',
    responseDate: '2025-05-22',
    equity: 4.0,
    valuation: 2000000,
    description: 'Electric vehicle charging infrastructure solutions',
  },
];

export default function BidStatusWidget({ isLoading = false }: BidStatusWidgetProps) {
  const navigate = useNavigate();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          ),
          label: 'Pending Review',
        };
      case 'accepted':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ),
          label: 'Accepted',
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ),
          label: 'Rejected',
        };
      case 'counter-offered':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ),
          label: 'Counter Offer',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null,
          label: status,
        };
    }
  };

  const pendingBids = mockBids.filter(bid => bid.status === 'pending').length;
  const totalBidAmount = mockBids.reduce((sum, bid) => sum + bid.bidAmount, 0);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        
        {/* Bids list */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
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
          <h3 className="text-lg font-semibold text-gray-900">Active Bids</h3>
          <button 
          onClick={() => navigate(`/investor/bidding`)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Bids
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Bids</p>
                <p className="text-xl font-bold text-gray-900">{pendingBids}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
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
              <div>
                <p className="text-sm font-medium text-gray-600">Total Committed</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalBidAmount)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bids List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockBids.map((bid) => {
            const statusConfig = getStatusConfig(bid.status);
            return (
              <div key={bid.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                      {bid.companyName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{bid.companyName}</h4>
                      <p className="text-sm text-gray-500">{bid.category}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                    {statusConfig.icon}
                    <span>{statusConfig.label}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{bid.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex space-x-6">
                    <div>
                      <span className="text-gray-500">Bid Amount:</span>
                      <span className="ml-1 font-medium text-gray-900">{formatCurrency(bid.bidAmount)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Equity:</span>
                      <span className="ml-1 font-medium text-gray-900">{bid.equity}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Valuation:</span>
                      <span className="ml-1 font-medium text-gray-900">{formatCurrency(bid.valuation)}</span>
                    </div>
                  </div>
                  <div className="text-gray-500">
                    Submitted {formatDate(bid.submittedDate)}
                    {bid.responseDate && (
                      <span> • Responded {formatDate(bid.responseDate)}</span>
                    )}
                  </div>
                </div>

                {bid.status === 'counter-offered' && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        Review Offer
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                )}                {bid.status === 'pending' && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => navigate(`/investor/bidding/${bid.id}`)}
                        className="px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Edit Bid
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to withdraw this bid?')) {
                            // TODO: Implement withdraw functionality
                            console.log('Withdrawing bid:', bid.id);
                          }
                        }}
                        className="px-4 py-2 border border-red-600 text-red-600 text-sm font-medium rounded-md hover:bg-red-50 transition-colors"
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {mockBids.length === 0 && (
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
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>            <p className="text-gray-500 mb-3">No active bids</p>            <button 
              onClick={() => navigate('/browse-startups')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Browse startups to place your first bid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

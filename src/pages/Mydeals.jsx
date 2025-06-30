import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Calendar, 
  User, 
  FileText, 
  Download,
  Eye,
  Filter,
  Search,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const sampleDeals = [
  {
    id: 1,
    ideaTitle: 'Smart Agriculture Platform',
    investor: 'GreenTech Ventures',
    investorLogo: 'https://via.placeholder.com/40?text=GV',
    amount: 100000,
    currency: '₹',
    date: '2025-05-15',
    paymentStatus: 'Paid',
    transactionId: 'TXN123456789',
    category: 'AgriTech',
    dealStage: 'Completed',
    roi: '+15%',
    documents: ['Investment Agreement', 'Term Sheet'],
    description: 'IoT-based smart farming solution for crop monitoring and yield optimization'
  },
  {
    id: 2,
    ideaTitle: 'Health Tracker AI',
    investor: 'MedInvest Capital',
    investorLogo: 'https://via.placeholder.com/40?text=MC',
    amount: 250000,
    currency: '₹',
    date: '2025-04-20',
    paymentStatus: 'Paid',
    transactionId: 'TXN987654321',
    category: 'HealthTech',
    dealStage: 'Completed',
    roi: '+22%',
    documents: ['Investment Agreement', 'IP License', 'NDA'],
    description: 'AI-powered health monitoring and predictive analytics platform'
  },
  {
    id: 3,
    ideaTitle: 'EduLearn Pro',
    investor: 'Future Learning Fund',
    investorLogo: 'https://via.placeholder.com/40?text=FL',
    amount: 180000,
    currency: '₹',
    date: '2025-03-10',
    paymentStatus: 'Processing',
    transactionId: 'TXN456789123',
    category: 'EdTech',
    dealStage: 'In Progress',
    roi: 'Pending',
    documents: ['LOI', 'Due Diligence Report'],
    description: 'Personalized learning platform with adaptive AI curriculum'
  },
  {
    id: 4,
    ideaTitle: 'GreenEnergy Solutions',
    investor: 'Climate Impact Investors',
    investorLogo: 'https://via.placeholder.com/40?text=CI',
    amount: 500000,
    currency: '₹',
    date: '2025-02-28',
    paymentStatus: 'Paid',
    transactionId: 'TXN789123456',
    category: 'CleanTech',
    dealStage: 'Completed',
    roi: '+28%',
    documents: ['Investment Agreement', 'Environmental Impact Report', 'Technical Specs'],
    description: 'Renewable energy storage and distribution system'
  }
];

export const Deals = () => {
  const [deals] = useState(sampleDeals);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [expandedDeal, setExpandedDeal] = useState(null);

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.ideaTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.investor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || deal.paymentStatus === filterStatus;
    const matchesCategory = filterCategory === 'All' || deal.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalDealsValue = deals
    .filter(deal => deal.paymentStatus === 'Paid')
    .reduce((sum, deal) => sum + deal.amount, 0);

  const completedDeals = deals.filter(deal => deal.paymentStatus === 'Paid').length;

  const categories = [...new Set(deals.map(deal => deal.category))];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🤝 Completed Deals</h1>
            <p className="text-gray-600">Track and manage your investment deals and transactions</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Deals</p>
                <p className="text-2xl font-bold text-gray-900">{deals.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedDeals}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{formatCurrency(totalDealsValue)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Avg. ROI</p>
                <p className="text-2xl font-bold text-green-600">+21.7%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search deals by title or investor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Processing">Processing</option>
                <option value="Pending">Pending</option>
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Table/Cards */}
      {filteredDeals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deal Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Investor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROI
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDeals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{deal.ideaTitle}</div>
                          <div className="text-sm text-gray-500">{deal.category}</div>
                          <div className="text-xs text-gray-400 mt-1">ID: {deal.transactionId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={deal.investorLogo} 
                            alt={deal.investor}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="font-medium text-gray-900">{deal.investor}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {deal.currency}{formatCurrency(deal.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(deal.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          deal.paymentStatus === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : deal.paymentStatus === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {deal.paymentStatus === 'Paid' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {deal.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${
                          deal.roi.includes('+') ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {deal.roi}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setExpandedDeal(expandedDeal === deal.id ? null : deal.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={deal.investorLogo} 
                      alt={deal.investor}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{deal.ideaTitle}</h3>
                      <p className="text-sm text-gray-600">{deal.investor}</p>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mt-1">
                        {deal.category}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    deal.paymentStatus === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : deal.paymentStatus === 'Processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {deal.paymentStatus === 'Paid' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {deal.paymentStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-semibold text-gray-900">
                      {deal.currency}{formatCurrency(deal.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ROI</p>
                    <p className={`font-semibold ${
                      deal.roi.includes('+') ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {deal.roi}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-gray-900">{formatDate(deal.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="text-gray-900 text-xs font-mono">{deal.transactionId}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setExpandedDeal(expandedDeal === deal.id ? null : deal.id)}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                  >
                    {expandedDeal === deal.id ? 'Hide Details' : 'View Details'}
                  </button>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedDeal === deal.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Description</p>
                      <p className="text-sm text-gray-600">{deal.description}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Documents</p>
                      <div className="space-y-2">
                        {deal.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{doc}</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
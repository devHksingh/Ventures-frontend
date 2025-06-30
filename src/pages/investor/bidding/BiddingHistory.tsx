import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBidding } from '../../../hooks/investor/bidding/use-bidding';
import { BidStatus } from '../../../types/investor/bidding';
import BiddingNavigation from '../../../components/investor/bidding/bidding-navigation';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import type { BidFilters } from '../../../types/investor/bidding';


export default function BiddingHistory() {
  const navigate = useNavigate();
  const { allBids, updateFilters, clearFilters, filters, isLoading } = useBidding();
  const [localFilters, setLocalFilters] = useState<BidFilters>(filters);

  const handleFilterChange = (key: keyof BidFilters, value: BidFilters[keyof BidFilters]) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    clearFilters();
  };

  const getStatusColor = (status: BidStatus) => {
    switch (status) {
      case BidStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case BidStatus.ACCEPTED:
        return 'bg-green-100 text-green-800';
      case BidStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case BidStatus.NEGOTIATING:
        return 'bg-blue-100 text-blue-800';
      case BidStatus.WITHDRAWN:
        return 'bg-slate-200 text-slate-800';
      case BidStatus.EXPIRED:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-slate-200 text-slate-800';
    }
  };

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
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleViewDetails = (bidId: string) => {
    navigate(`/investor/bidding/${bidId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <>
      <InvestorHeader 
        title="Bidding History" 
        subtitle="View and filter your investment bid history with advanced search options."
      />
      <BiddingNavigation />
      <div className="max-w-7xl mx-auto py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold text-black">Filters</h3>
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Status</label>
              <select
                value={localFilters.status?.[0] || ''}
                onChange={(e) => handleFilterChange('status', e.target.value ? [e.target.value as BidStatus] : undefined)}
                className="w-full px-3 py-2 text-gray-700 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value={BidStatus.PENDING}>Pending</option>
                <option value={BidStatus.ACCEPTED}>Accepted</option>
                <option value={BidStatus.REJECTED}>Rejected</option>
                <option value={BidStatus.NEGOTIATING}>Negotiating</option>
                <option value={BidStatus.WITHDRAWN}>Withdrawn</option>
                <option value={BidStatus.EXPIRED}>Expired</option>
              </select>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Min Amount</label>
              <input
                type="number"
                placeholder="$0"
                value={localFilters.amountRange?.min || ''}
                onChange={(e) => {
                  const min = e.target.value ? parseInt(e.target.value) : undefined;
                  const max = localFilters.amountRange?.max;
                  handleFilterChange('amountRange', min || max ? { min: min || 0, max: max || 999999999 } : undefined);
                }}
                className="w-full px-3 py-2 text-gray-700 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Max Amount</label>
              <input
                type="number"
                placeholder="No limit"
                value={localFilters.amountRange?.max || ''}
                onChange={(e) => {
                  const max = e.target.value ? parseInt(e.target.value) : undefined;
                  const min = localFilters.amountRange?.min;
                  handleFilterChange('amountRange', min || max ? { min: min || 0, max: max || 999999999 } : undefined);
                }}
                className="w-full px-3 py-2 border text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Sort By</label>
              <select
                value={localFilters.sortBy || 'date'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value as 'amount' | 'date' | 'valuation' | 'equity')}
                className="w-full px-3 py-2 text-gray-700 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="valuation">Valuation</option>
                <option value="equity">Equity %</option>
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">From Date</label>
              <input
                type="date"
                value={localFilters.dateRange?.start || ''}
                onChange={(e) => {
                  const start = e.target.value;
                  const end = localFilters.dateRange?.end;
                  handleFilterChange('dateRange', start || end ? { start: start || '', end: end || '' } : undefined);
                }}
                className="w-full px-3 py-2 text-gray-700 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">To Date</label>
              <input
                type="date"
                value={localFilters.dateRange?.end || ''}
                onChange={(e) => {
                  const end = e.target.value;
                  const start = localFilters.dateRange?.start;
                  handleFilterChange('dateRange', start || end ? { start: start || '', end: end || '' } : undefined);
                }}
                className="w-full px-3 py-2 text-gray-700 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-slate-300">
            <h2 className="text-lg font-semibold text-black">
              All Bids ({allBids.length})
            </h2>
          </div>
          
          {allBids.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-black mb-2">No bids found</h3>
              <p className="text-slate-600 mb-4">No bids match your current filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Startup
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Equity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valuation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allBids.map((bid) => (
                    <tr key={bid.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{bid.startupName}</div>
                          <div className="text-sm text-gray-500">{bid.startupCategory}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(bid.amount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{bid.equityPercentage}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(bid.valuation)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bid.status)}`}>
                          {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(bid.submittedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(bid.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(bid.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}        </div>
      </div>
    </>
  );
}

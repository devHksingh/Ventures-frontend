'use client';

import { useState } from 'react';
import type { Bid } from '../../types/bidding';
import { BidStatus } from '../../types/bidding';

interface BidComparisonTableProps {
  bids: Bid[];
  startupName?: string;
  onSelectBid?: (bid: Bid) => void;
}

export default function BidComparisonTable({ bids, startupName, onSelectBid }: BidComparisonTableProps) {
  const [sortBy, setSortBy] = useState<'amount' | 'equity' | 'valuation' | 'date'>('amount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const sortedBids = [...bids].sort((a, b) => {
    let aValue: number | Date, bValue: number | Date;
    
    switch (sortBy) {
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'equity':
        aValue = a.equityPercentage;
        bValue = b.equityPercentage;
        break;
      case 'valuation':
        aValue = a.valuation;
        bValue = b.valuation;
        break;
      case 'date':
        aValue = new Date(a.submittedAt);
        bValue = new Date(b.submittedAt);
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'desc') {
      return aValue < bValue ? 1 : -1;
    }
    return aValue > bValue ? 1 : -1;
  });

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
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
        return 'bg-gray-100 text-gray-800';
      case BidStatus.EXPIRED:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const getSortIcon = (column: typeof sortBy) => {
    if (sortBy !== column) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const calculateMetrics = () => {
    if (bids.length === 0) return null;
    
    const amounts = bids.map(bid => bid.amount);
    const equities = bids.map(bid => bid.equityPercentage);
    const valuations = bids.map(bid => bid.valuation);
    
    return {
      avgAmount: amounts.reduce((a, b) => a + b, 0) / amounts.length,
      minAmount: Math.min(...amounts),
      maxAmount: Math.max(...amounts),
      avgEquity: equities.reduce((a, b) => a + b, 0) / equities.length,
      minEquity: Math.min(...equities),
      maxEquity: Math.max(...equities),
      avgValuation: valuations.reduce((a, b) => a + b, 0) / valuations.length,
      minValuation: Math.min(...valuations),
      maxValuation: Math.max(...valuations),
    };
  };

  const metrics = calculateMetrics();

  if (bids.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bids to compare</h3>
        <p className="text-gray-600">Submit multiple bids to see comparison data</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Bid Comparison</h3>
            {startupName && (
              <p className="text-sm text-gray-600 mt-1">
                Comparing {bids.length} bids for {startupName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Total: {bids.length} bids</span>
            <span>•</span>
            <span>
              Active: {bids.filter(bid => 
                bid.status === BidStatus.PENDING || bid.status === BidStatus.NEGOTIATING
              ).length}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      {metrics && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Investment Amount</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-medium">{formatCurrency(metrics.avgAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Range:</span>
                  <span className="font-medium">
                    {formatCurrency(metrics.minAmount)} - {formatCurrency(metrics.maxAmount)}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Equity Percentage</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-medium">{metrics.avgEquity.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Range:</span>
                  <span className="font-medium">
                    {metrics.minEquity}% - {metrics.maxEquity}%
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Valuation</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-medium">{formatCurrency(metrics.avgValuation)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Range:</span>
                  <span className="font-medium">
                    {formatCurrency(metrics.minValuation)} - {formatCurrency(metrics.maxValuation)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Investor
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center gap-1">
                  Amount
                  {getSortIcon('amount')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('equity')}
              >
                <div className="flex items-center gap-1">
                  Equity
                  {getSortIcon('equity')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('valuation')}
              >
                <div className="flex items-center gap-1">
                  Valuation
                  {getSortIcon('valuation')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Terms
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-1">
                  Date
                  {getSortIcon('date')}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedBids.map((bid) => (
              <tr key={bid.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{bid.investorName}</div>
                  <div className="text-sm text-gray-500">ID: {bid.id.slice(-6)}</div>
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
                  <div className="flex flex-col gap-1">
                    {bid.terms.preferredShares && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        Preferred
                      </span>
                    )}
                    {bid.terms.boardSeat && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                        Board Seat
                      </span>
                    )}
                    {bid.terms.liquidationPreference > 1 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                        {bid.terms.liquidationPreference}x Liq Pref
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bid.status)}`}>
                    {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(bid.submittedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {onSelectBid && (
                    <button
                      onClick={() => onSelectBid(bid)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Select
                    </button>
                  )}
                  <button className="text-gray-600 hover:text-gray-900">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with additional stats */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-6">
            <span>
              Accepted: {bids.filter(bid => bid.status === BidStatus.ACCEPTED).length}
            </span>
            <span>
              Rejected: {bids.filter(bid => bid.status === BidStatus.REJECTED).length}
            </span>
            <span>
              Negotiating: {bids.filter(bid => bid.status === BidStatus.NEGOTIATING).length}
            </span>
          </div>
          <div>
            Last updated: {formatDate(new Date().toISOString())}
          </div>
        </div>
      </div>
    </div>
  );
}

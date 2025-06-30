'use client';

import type { Bid } from '../../types/bidding';
import { BidStatus } from '../../types/bidding';
import { Link } from 'react-router-dom';

interface BidCardProps {
  bid: Bid;
  showDetails?: boolean;
  onStatusChange?: (bidId: string, newStatus: BidStatus) => void;
  onWithdraw?: (bidId: string) => void;
}

export default function BidCard({ bid, showDetails = false, onWithdraw }: Omit<BidCardProps, 'onStatusChange'>) {
  const getStatusColor = (status: BidStatus) => {
    switch (status) {
      case BidStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case BidStatus.ACCEPTED:
        return 'bg-green-100 text-green-800 border-green-200';
      case BidStatus.REJECTED:
        return 'bg-red-100 text-red-800 border-red-200';
      case BidStatus.NEGOTIATING:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case BidStatus.WITHDRAWN:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case BidStatus.EXPIRED:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: BidStatus) => {
    switch (status) {
      case BidStatus.PENDING:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case BidStatus.ACCEPTED:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case BidStatus.REJECTED:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case BidStatus.NEGOTIATING:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Expires today';
    if (diffDays === 1) return 'Expires tomorrow';
    return `${diffDays} days remaining`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{bid.startupName}</h3>
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-full border ${getStatusColor(bid.status)}`}>
              {getStatusIcon(bid.status)}
              {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600">{bid.startupCategory}</p>
        </div>
        
        {!showDetails && (
          <Link
            to={`/bidding/${bid.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details →
          </Link>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <div className="text-sm font-medium text-gray-600">Investment</div>
          <div className="text-xl font-bold text-gray-900">{formatCurrency(bid.amount)}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-600">Equity</div>
          <div className="text-xl font-bold text-gray-900">{bid.equityPercentage}%</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-600">Valuation</div>
          <div className="text-xl font-bold text-gray-900">{formatCurrency(bid.valuation)}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-600">Expires</div>
          <div className="text-sm font-medium text-orange-600">{getTimeRemaining(bid.expiresAt)}</div>
        </div>
      </div>

      {/* Timeline and Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <div className="text-sm font-medium text-gray-600">Submitted</div>
          <div className="text-sm text-gray-900">{formatDate(bid.submittedAt)}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-600">Due Diligence By</div>
          <div className="text-sm text-gray-900">{formatDate(bid.timeline.dueDiligenceDeadline)}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-600">Expected Closing</div>
          <div className="text-sm text-gray-900">{formatDate(bid.timeline.expectedClosing)}</div>
        </div>
      </div>

      {/* Key Terms Preview */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Key Terms</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Preferred Shares</span>
            <span className={`font-medium ${bid.terms.preferredShares ? 'text-green-600' : 'text-red-600'}`}>
              {bid.terms.preferredShares ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Board Seat</span>
            <span className={`font-medium ${bid.terms.boardSeat ? 'text-green-600' : 'text-red-600'}`}>
              {bid.terms.boardSeat ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Liquidation Pref</span>
            <span className="font-medium text-gray-900">{bid.terms.liquidationPreference}x</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Anti-Dilution</span>
            <span className="font-medium text-gray-900 capitalize">
              {bid.terms.antiDilution.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          {/* Use of Funds */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Use of Funds</h4>
            <p className="text-sm text-gray-600">{bid.terms.useOfFunds}</p>
          </div>

          {/* Milestones */}
          {bid.terms.milestones.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Key Milestones</h4>
              <ul className="space-y-1">
                {bid.terms.milestones.slice(0, 3).map((milestone, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {milestone}
                  </li>
                ))}
                {bid.terms.milestones.length > 3 && (
                  <li className="text-sm text-gray-500">
                    +{bid.terms.milestones.length - 3} more milestones
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Recent Activity */}
      {bid.negotiations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Latest Activity</h4>
          <div className="bg-gray-50 rounded-md p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">
                {bid.negotiations[bid.negotiations.length - 1].participantName}
              </span>
              <span className="text-xs text-gray-500">
                {formatDateTime(bid.negotiations[bid.negotiations.length - 1].timestamp)}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {bid.negotiations[bid.negotiations.length - 1].message}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Updated {formatDate(bid.updatedAt)}
        </div>
        
        <div className="flex items-center gap-2">
          {bid.status === BidStatus.PENDING && onWithdraw && (
            <button
              onClick={() => onWithdraw(bid.id)}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Withdraw
            </button>
          )}
          
          {(bid.status === BidStatus.PENDING || bid.status === BidStatus.NEGOTIATING) && (
            <Link
              to={`/bidding/${bid.id}`}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
            >
              {bid.status === BidStatus.NEGOTIATING ? 'Continue Negotiation' : 'View Details'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

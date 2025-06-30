import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBidding } from '../../../hooks/investor/bidding/use-bidding';
import { BidStatus } from '../../../types/investor/bidding';
import BiddingNavigation from '../../../components/investor/bidding/bidding-navigation';
import InvestorHeader from '../../../components/layouts/investor/investor-header';

export default function BiddingDetail() {
  const { bidId } = useParams<{ bidId: string }>();
  const { getBidById, addNegotiation, isLoading } = useBidding();
  const [negotiationMessage, setNegotiationMessage] = useState('');
  const [isSubmittingNegotiation, setIsSubmittingNegotiation] = useState(false);
  
  const bid = bidId ? getBidById(bidId) : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!bid) {
    return (
      <>
        <InvestorHeader 
          title="Bid Not Found" 
          subtitle="The bid you're looking for doesn't exist or has been removed."
        />
        <BiddingNavigation />
        <div className="max-w-4xl mx-auto py-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Bid Not Found</h1>
            <p className="text-gray-600 mb-6">The bid you're looking for doesn't exist or has been removed.</p>            <Link 
              to="/investor/bidding" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Bidding
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleAddNegotiation = async () => {
    if (!negotiationMessage.trim() || !bidId) return;
    
    setIsSubmittingNegotiation(true);
    try {
      await addNegotiation(bidId, negotiationMessage);
      setNegotiationMessage('');
    } catch (error) {
      console.error('Failed to add negotiation:', error);
    } finally {
      setIsSubmittingNegotiation(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

  return (
    <>
      <InvestorHeader 
        title="Bid Details" 
        subtitle={`View and manage your investment bid for ${bid.startupName}`}
      />
      <BiddingNavigation />
      <div className="max-w-6xl mx-auto py-6">
        <div className="mb-6">          <Link 
            to="/investor/bidding" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Bidding
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Bid Overview */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{bid.startupName}</h2>
                  <p className="text-sm text-gray-600">{bid.startupCategory}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bid.status)}`}>
                  {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-600">Investment Amount</div>
                  <div className="text-lg font-semibold text-gray-900">{formatCurrency(bid.amount)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Equity</div>
                  <div className="text-lg font-semibold text-gray-900">{bid.equityPercentage}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Valuation</div>
                  <div className="text-lg font-semibold text-gray-900">{formatCurrency(bid.valuation)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Submitted</div>
                  <div className="text-sm text-gray-900">{formatDate(bid.submittedAt)}</div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Preferred Shares</span>
                    <span className={`text-sm ${bid.terms.preferredShares ? 'text-green-600' : 'text-red-600'}`}>
                      {bid.terms.preferredShares ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Board Seat</span>
                    <span className={`text-sm ${bid.terms.boardSeat ? 'text-green-600' : 'text-red-600'}`}>
                      {bid.terms.boardSeat ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Liquidation Preference</span>
                    <span className="text-sm text-gray-900">{bid.terms.liquidationPreference}x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Anti-Dilution</span>
                    <span className="text-sm text-gray-900 capitalize">{bid.terms.antiDilution.replace('-', ' ')}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Pro-Rata Rights</span>
                    <span className={`text-sm ${bid.terms.proRataRights ? 'text-green-600' : 'text-red-600'}`}>
                      {bid.terms.proRataRights ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Voting Rights</span>
                    <span className={`text-sm ${bid.terms.votingRights ? 'text-green-600' : 'text-red-600'}`}>
                      {bid.terms.votingRights ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Information Rights</span>
                    <span className={`text-sm ${bid.terms.informationRights ? 'text-green-600' : 'text-red-600'}`}>
                      {bid.terms.informationRights ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Tag-Along Rights</span>
                    <span className={`text-sm ${bid.terms.tagAlongRights ? 'text-green-600' : 'text-red-600'}`}>
                      {bid.terms.tagAlongRights ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Use of Funds */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Use of Funds</h4>
                <p className="text-sm text-gray-600">{bid.terms.useOfFunds}</p>
              </div>

              {/* Milestones */}
              {bid.terms.milestones.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Milestones</h4>
                  <ul className="space-y-1">
                    {bid.terms.milestones.map((milestone, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Due Diligence Requirements */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Due Diligence Requirements</h3>
              <ul className="space-y-2">
                {bid.dueDiligenceRequirements.map((requirement, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Negotiations */}
            {bid.negotiations.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Negotiation History</h3>
                <div className="space-y-4">
                  {bid.negotiations.map((negotiation) => (
                    <div key={negotiation.id} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{negotiation.participantName}</span>
                        <span className="text-xs text-gray-500">{formatDate(negotiation.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{negotiation.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Negotiation */}
            {bid.status === BidStatus.NEGOTIATING && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Negotiation Message</h3>
                <div className="space-y-4">
                  <textarea
                    value={negotiationMessage}
                    onChange={(e) => setNegotiationMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Enter your negotiation message..."
                  />
                  <button
                    onClick={handleAddNegotiation}
                    disabled={isSubmittingNegotiation || !negotiationMessage.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingNegotiation ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">Due Diligence Deadline</div>
                  <div className="text-sm text-gray-900">{formatDate(bid.timeline.dueDiligenceDeadline)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Funding Deadline</div>
                  <div className="text-sm text-gray-900">{formatDate(bid.timeline.fundingDeadline)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Expected Closing</div>
                  <div className="text-sm text-gray-900">{formatDate(bid.timeline.expectedClosing)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Expires At</div>
                  <div className="text-sm text-gray-900">{formatDate(bid.expiresAt)}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                {bid.status === BidStatus.PENDING && (
                  <>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Accept Bid
                    </button>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Start Negotiation
                    </button>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                      Withdraw Bid
                    </button>
                  </>
                )}                <Link
                  to="/investor/bidding/submit"
                  className="block w-full px-4 py-2 bg-gray-600 text-white text-center rounded-md hover:bg-gray-700"
                >
                  Create New Bid
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBidding } from '../../../hooks/investor/bidding/use-bidding';
import { BidSubmissionData } from '../../../types/investor/bidding';
import BiddingNavigation from '../../../components/investor/bidding/bidding-navigation';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import BidForm from '../../../components/investor/bidding/bid-form';


export default function BiddingSubmit() {
  const navigate = useNavigate();
  const { submitBid, isLoading } = useBidding();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (bidData: BidSubmissionData) => {
    setIsSubmitting(true);
    try {
      setError(null);
      const newBid = await submitBid(bidData);
      navigate(`/bidding/${newBid.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit bid');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/bidding');
  };

  return (
    <>
      <InvestorHeader 
        title="Submit Investment Bid" 
        subtitle="Create a comprehensive investment offer for your target startup."
      />
      <BiddingNavigation />
      <div className="max-w-4xl mx-auto py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error submitting bid
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bid Form */}
          <div className="p-6">
            <BidForm 
              onSubmit={handleSubmit}
              isLoading={isLoading || isSubmitting}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import type { BidSubmissionData, BidTerms, BidTimeline } from '../../types/bidding';

// Inline TS interfaces to avoid runtime type imports
// interface BidTimeline {
//   dueDiligenceDeadline: string;
//   fundingDeadline: string;
//   expectedClosing: string;
//   milestoneReviewDates: string[];
// }
// interface BidTerms {
//   preferredShares: boolean;
//   boardSeat: boolean;
//   liquidationPreference: number;
//   antiDilution: string;
//   proRataRights: boolean;
//   tagAlongRights: boolean;
//   dragAlongRights: boolean;
//   votingRights: boolean;
//   informationRights: boolean;
//   useOfFunds: string;
//   milestones: string[];
//   restrictions: string[];
// }
// interface BidSubmissionData {
//   startupId: string;
//   amount: number;
//   equityPercentage: number;
//   terms: BidTerms;
//   dueDiligenceRequirements: string[];
//   timeline: BidTimeline;
//   message?: string;
//   attachments?: File[];
// }

interface BidFormProps {
  onSubmit: (bidData: BidSubmissionData) => Promise<void>;
  isLoading: boolean;
  onCancel: () => void;
  initialData?: Partial<BidSubmissionData>;
}

// Mock startup data - in real app, this would come from API
const mockStartups = [
  { id: '101', name: 'AI-Powered Sales Analytics Platform', category: 'Software' },
  { id: '102', name: 'Sustainable Urban Farming Solution', category: 'Agriculture' },
  { id: '103', name: 'Wearable Health Monitoring Device', category: 'Healthcare' },
  { id: '104', name: 'Blockchain Supply Chain Platform', category: 'Technology' },
  { id: '105', name: 'Virtual Reality Education Platform', category: 'Education' },
];

export default function BidForm({ onSubmit, isLoading, onCancel, initialData }: BidFormProps) {
  const [formData, setFormData] = useState<BidSubmissionData>({
    startupId: initialData?.startupId || '',
    amount: initialData?.amount || 0,
    equityPercentage: initialData?.equityPercentage || 0,
    terms: {
      preferredShares: initialData?.terms?.preferredShares || false,
      boardSeat: initialData?.terms?.boardSeat || false,
      liquidationPreference: initialData?.terms?.liquidationPreference || 1,
      antiDilution: initialData?.terms?.antiDilution || 'none',
      proRataRights: initialData?.terms?.proRataRights || false,
      tagAlongRights: initialData?.terms?.tagAlongRights || false,
      dragAlongRights: initialData?.terms?.dragAlongRights || false,
      votingRights: initialData?.terms?.votingRights || false,
      informationRights: initialData?.terms?.informationRights || false,
      useOfFunds: initialData?.terms?.useOfFunds || '',
      milestones: initialData?.terms?.milestones || [],
      restrictions: initialData?.terms?.restrictions || [],
      ...initialData?.terms
    },
    dueDiligenceRequirements: initialData?.dueDiligenceRequirements || [],
    timeline: {
      dueDiligenceDeadline: initialData?.timeline?.dueDiligenceDeadline || '',
      fundingDeadline: initialData?.timeline?.fundingDeadline || '',
      expectedClosing: initialData?.timeline?.expectedClosing || '',
      milestoneReviewDates: initialData?.timeline?.milestoneReviewDates || [],
      ...initialData?.timeline
    },
    message: initialData?.message || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BidSubmissionData, string>>>({});
  const [newMilestone, setNewMilestone] = useState('');
  const [newRestriction, setNewRestriction] = useState('');
  const [newDueDiligence, setNewDueDiligence] = useState('');
  const [newReviewDate, setNewReviewDate] = useState('');
  const handleInputChange = (field: keyof BidSubmissionData, value: string | number | BidTerms | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTermsChange = (field: keyof BidTerms, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      terms: { ...prev.terms, [field]: value }
    }));
  };

  const handleTimelineChange = (field: keyof BidTimeline, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      timeline: { ...prev.timeline, [field]: value }
    }));
  };

  const addMilestone = () => {
    if (newMilestone.trim()) {
      handleTermsChange('milestones', [...formData.terms.milestones, newMilestone.trim()]);
      setNewMilestone('');
    }
  };

  const removeMilestone = (index: number) => {
    const updated = formData.terms.milestones.filter((_, i) => i !== index);
    handleTermsChange('milestones', updated);
  };

  const addRestriction = () => {
    if (newRestriction.trim()) {
      handleTermsChange('restrictions', [...formData.terms.restrictions, newRestriction.trim()]);
      setNewRestriction('');
    }
  };

  const removeRestriction = (index: number) => {
    const updated = formData.terms.restrictions.filter((_, i) => i !== index);
    handleTermsChange('restrictions', updated);
  };

  const addDueDiligence = () => {
    if (newDueDiligence.trim()) {
      handleInputChange('dueDiligenceRequirements', [...formData.dueDiligenceRequirements, newDueDiligence.trim()]);
      setNewDueDiligence('');
    }
  };

  const removeDueDiligence = (index: number) => {
    const updated = formData.dueDiligenceRequirements.filter((_, i) => i !== index);
    handleInputChange('dueDiligenceRequirements', updated);
  };

  const addReviewDate = () => {
    if (newReviewDate) {
      handleTimelineChange('milestoneReviewDates', [...formData.timeline.milestoneReviewDates, newReviewDate]);
      setNewReviewDate('');
    }
  };

  const removeReviewDate = (index: number) => {
    const updated = formData.timeline.milestoneReviewDates.filter((_, i) => i !== index);
    handleTimelineChange('milestoneReviewDates', updated);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BidSubmissionData, string>> = {};

    if (!formData.startupId) newErrors.startupId = 'Please select a startup';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Please enter a valid investment amount';
    if (!formData.equityPercentage || formData.equityPercentage <= 0 || formData.equityPercentage > 100) {
      newErrors.equityPercentage = 'Please enter a valid equity percentage (1-100)';
    }
    if (!formData.terms.useOfFunds.trim()) newErrors.message = 'Please specify use of funds';
    if (!formData.timeline.dueDiligenceDeadline) newErrors.message = 'Please set due diligence deadline';
    if (!formData.timeline.fundingDeadline) newErrors.message = 'Please set funding deadline';
    if (!formData.timeline.expectedClosing) newErrors.message = 'Please set expected closing date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting bid:', error);
    }  };

  const calculatedValuation = formData.amount && formData.equityPercentage 
    ? formData.amount / (formData.equityPercentage / 100)
    : 0;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Startup <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.startupId}
              onChange={(e) => handleInputChange('startupId', e.target.value)}
              className="w-full px-3 py-2  text-gray-700 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a startup</option>
              {mockStartups.map(startup => (
                <option key={startup.id} value={startup.id}>
                  {startup.name} ({startup.category})
                </option>
              ))}
            </select>
            {errors.startupId && <p className="mt-1 text-sm text-red-600">{errors.startupId}</p>}
          </div>          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Investment Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-600">$</span>
              <input
                type="number"
                value={formData.amount || ''}
                onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2 border  text-slate-600 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
                required
              />
            </div>
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Equity Percentage <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.equityPercentage || ''}
                onChange={(e) => handleInputChange('equityPercentage', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2  text-gray-700 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
                max="100"
                step="0.1"
                required
              />
              <span className="absolute right-3 top-2 text-slate-600">%</span>
            </div>
            {errors.equityPercentage && <p className="mt-1 text-sm text-red-600">{errors.equityPercentage}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Implied Valuation</label>
            <div className="px-3 py-2 bg-slate-100 border border-slate-400 rounded-md text-black">
              ${calculatedValuation.toLocaleString()}
            </div>
          </div>
        </div>
      </div>      {/* Investment Terms */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Investment Terms</h3>
        
        {/* Rights and Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="text-md font-medium text-black">Rights and Preferences</h4>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.terms.preferredShares}
                onChange={(e) => handleTermsChange('preferredShares', e.target.checked)}
                className="rounded border-slate-400 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-black">Preferred Shares</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.terms.boardSeat}
                onChange={(e) => handleTermsChange('boardSeat', e.target.checked)}
                className="rounded border-slate-400 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-black">Board Seat</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.terms.proRataRights}
                onChange={(e) => handleTermsChange('proRataRights', e.target.checked)}
                className="rounded border-slate-400 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-black">Pro-Rata Rights</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.terms.votingRights}
                onChange={(e) => handleTermsChange('votingRights', e.target.checked)}
                className="rounded border-slate-400 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-black">Voting Rights</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.terms.informationRights}
                onChange={(e) => handleTermsChange('informationRights', e.target.checked)}
                className="rounded border-slate-400 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-black">Information Rights</span>
            </label>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-medium text-black">Protection Rights</h4>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.terms.tagAlongRights}
                onChange={(e) => handleTermsChange('tagAlongRights', e.target.checked)}
                className="rounded border-slate-400 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-black">Tag-Along Rights</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.terms.dragAlongRights}
                onChange={(e) => handleTermsChange('dragAlongRights', e.target.checked)}
                className="rounded border-slate-400 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-black">Drag-Along Rights</span>
            </label>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Liquidation Preference</label>
              <input
                type="number"
                value={formData.terms.liquidationPreference}
                onChange={(e) => handleTermsChange('liquidationPreference', parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 border  text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Anti-Dilution</label>
              <select
                value={formData.terms.antiDilution}
                onChange={(e) => handleTermsChange('antiDilution', e.target.value)}
                className="w-full px-3 py-2 border text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="none">None</option>
                <option value="weighted-average">Weighted Average</option>
                <option value="full-ratchet">Full Ratchet</option>
              </select>
            </div>
          </div>
        </div>        {/* Use of Funds */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2">
            Use of Funds <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.terms.useOfFunds}
            onChange={(e) => handleTermsChange('useOfFunds', e.target.value)}
            className="w-full px-3 py-2 border  text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Describe how the investment will be used..."
            required
          />
        </div>

        {/* Milestones */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2">Key Milestones</label>
          <div className="space-y-2">
            {formData.terms.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex-1 px-3 py-2  text-gray-700 bg-slate-100 border border-slate-400 rounded-md text-sm">
                  {milestone}
                </span>
                <button
                  type="button"
                  onClick={() => removeMilestone(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                className="flex-1 px-3 py-2 border  text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a milestone..."
              />
              <button
                type="button"
                onClick={addMilestone}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Restrictions */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2">Restrictions</label>
          <div className="space-y-2">
            {formData.terms.restrictions.map((restriction, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex-1 px-3 py-2 bg-slate-100 border border-slate-400 rounded-md text-sm">
                  {restriction}
                </span>
                <button
                  type="button"
                  onClick={() => removeRestriction(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newRestriction}
                onChange={(e) => setNewRestriction(e.target.value)}
                className="flex-1 px-3 py-2 border  text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a restriction..."
              />
              <button
                type="button"
                onClick={addRestriction}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Due Diligence Requirements */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Due Diligence Requirements</h3>
        <div className="space-y-2">
          {formData.dueDiligenceRequirements.map((requirement, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex-1 px-3 py-2 bg-slate-100 border border-slate-400 rounded-md text-sm">
                {requirement}
              </span>
              <button
                type="button"
                onClick={() => removeDueDiligence(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newDueDiligence}
              onChange={(e) => setNewDueDiligence(e.target.value)}
              className="flex-1 px-3 py-2 border  text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a due diligence requirement..."
            />
            <button
              type="button"
              onClick={addDueDiligence}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Due Diligence Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={formData.timeline.dueDiligenceDeadline}
              onChange={(e) => handleTimelineChange('dueDiligenceDeadline', e.target.value)}
              className="w-full px-3 py-2 border  text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Funding Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={formData.timeline.fundingDeadline}
              onChange={(e) => handleTimelineChange('fundingDeadline', e.target.value)}
              className="w-full px-3 py-2 border text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Expected Closing <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={formData.timeline.expectedClosing}
              onChange={(e) => handleTimelineChange('expectedClosing', e.target.value)}              
              className="w-full px-3 py-2 border text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Milestone Review Dates */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">Milestone Review Dates</label>
          <div className="space-y-2">
            {formData.timeline.milestoneReviewDates.map((date, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex-1 px-3 py-2 text-gray-700 bg-slate-100 border border-slate-400 rounded-md text-sm">
                  {new Date(date).toLocaleDateString()}
                </span>
                <button
                  type="button"
                  onClick={() => removeReviewDate(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="date"
                value={newReviewDate}
                onChange={(e) => setNewReviewDate(e.target.value)}
                className="flex-1 px-3 py-2 border text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addReviewDate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Date
              </button>
            </div>
          </div>
        </div>
      </div>      {/* Additional Message */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">Additional Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className="w-full px-3 py-2 border text-gray-700 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Any additional information or specific terms you'd like to discuss..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t border-slate-300">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-slate-400 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Bid'}
        </button>
      </div>
    </form>
  );
}

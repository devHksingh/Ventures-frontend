import { useState } from 'react';
import { Link } from 'react-router-dom';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import { Card, CardContent } from '../../../components/ui/investor/card';

interface InvestmentPreferencesData {
  industries: string[];
  stages: string[];
  investmentRange: {
    min: number;
    max: number;
  };
  riskTolerance: 'low' | 'medium' | 'high';
  geography: string[];
  exitStrategy: string[];
}

const mockPreferences: InvestmentPreferencesData = {
  industries: ['Technology', 'Healthcare', 'Fintech'],
  stages: ['Seed', 'Series A', 'Series B'],
  investmentRange: {
    min: 10000,
    max: 500000,
  },
  riskTolerance: 'medium',
  geography: ['North America', 'Europe'],
  exitStrategy: ['IPO', 'Acquisition'],
};

export default function InvestmentPreferences() {
  const [preferences, setPreferences] = useState<InvestmentPreferencesData>(mockPreferences);

  const handleIndustryToggle = (industry: string) => {
    setPreferences(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }));
  };

  const handleStageToggle = (stage: string) => {
    setPreferences(prev => ({
      ...prev,
      stages: prev.stages.includes(stage)
        ? prev.stages.filter(s => s !== stage)
        : [...prev.stages, stage]
    }));
  };

  const availableIndustries = [
    'Technology', 'Healthcare', 'Fintech', 'E-commerce', 'Education',
    'Energy', 'Real Estate', 'Manufacturing', 'Entertainment', 'Food & Beverage'
  ];

  const availableStages = [
    'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth', 'Late Stage'
  ];

  return (
    <>
      <InvestorHeader
        title="Investment Preferences"
        subtitle="Configure your investment criteria and preferences"
        actions={
          <Link 
            to="/investor/profile"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Profile
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {/* Industries */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Industries</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableIndustries.map((industry) => (
                <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.industries.includes(industry)}
                    onChange={() => handleIndustryToggle(industry)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{industry}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Stages */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Stages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableStages.map((stage) => (
                <label key={stage} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.stages.includes(stage)}
                    onChange={() => handleStageToggle(stage)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{stage}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Range */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Investment ($)
                </label>
                <input
                  type="number"
                  value={preferences.investmentRange.min}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    investmentRange: { ...prev.investmentRange, min: Number(e.target.value) }
                  }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Investment ($)
                </label>
                <input
                  type="number"
                  value={preferences.investmentRange.max}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    investmentRange: { ...prev.investmentRange, max: Number(e.target.value) }
                  }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Tolerance */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Tolerance</h3>
            <div className="space-y-3">
              {(['low', 'medium', 'high'] as const).map((risk) => (
                <label key={risk} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="riskTolerance"
                    value={risk}
                    checked={preferences.riskTolerance === risk}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      riskTolerance: e.target.value as 'low' | 'medium' | 'high'
                    }))}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{risk} Risk</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </>
  );
}

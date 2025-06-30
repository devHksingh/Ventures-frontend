import { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface SearchFiltersProps {
  onSearch: (filters: {
    query: string;
    industry: string;
    fundingStage: string;
    fundingRange: [number, number];
    roiRange: [number, number];
  }) => void;
  industries: string[];
}

export default function SearchFilters({
  onSearch,
  industries = [],
}: SearchFiltersProps) {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [fundingStage, setFundingStage] = useState('');
  const [minFunding, setMinFunding] = useState('');
  const [maxFunding, setMaxFunding] = useState('');
  const [minRoi, setMinRoi] = useState('');
  const [maxRoi, setMaxRoi] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const fundingStages = [
    { value: 'pre-seed', label: 'Pre-Seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series-a', label: 'Series A' },
    { value: 'series-b', label: 'Series B' },
    { value: 'series-c', label: 'Series C' },
  ];

  const handleSearch = () => {
    onSearch({
      query,
      industry,
      fundingStage,
      fundingRange: [
        minFunding ? parseInt(minFunding) : 0,
        maxFunding ? parseInt(maxFunding) : 10000000,
      ],
      roiRange: [
        minRoi ? parseFloat(minRoi) : 0,
        maxRoi ? parseFloat(maxRoi) : 100,
      ],
    });
  };

  const handleReset = () => {
    setQuery('');
    setIndustry('');
    setFundingStage('');
    setMinFunding('');
    setMaxFunding('');
    setMinRoi('');
    setMaxRoi('');
    onSearch({
      query: '',
      industry: '',
      fundingStage: '',
      fundingRange: [0, 10000000],
      roiRange: [0, 100],
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="flex-grow mb-4 md:mb-0">
          <Input
            placeholder="Search startups..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex space-x-2 text-white">
          <Button onClick={handleSearch}>Search</Button>
          <Button
            variant="secondary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Filters {isExpanded ? '▲' : '▼'}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-slate-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 border-slate-400"
            >
              <option value="">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Funding Stage
            </label>
            <select
              value={fundingStage}
              onChange={(e) => setFundingStage(e.target.value)}
              className="w-full text-slate-700 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 border-slate-400"
            >
              <option value="">All Stages</option>
              {fundingStages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Funding Range ($)
            </label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={minFunding}
                onChange={(e) => setMinFunding(e.target.value)}
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxFunding}
                onChange={(e) => setMaxFunding(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              ROI Range (x)
            </label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={minRoi}
                onChange={(e) => setMinRoi(e.target.value)}
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxRoi}
                onChange={(e) => setMaxRoi(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <Button variant="secondary" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
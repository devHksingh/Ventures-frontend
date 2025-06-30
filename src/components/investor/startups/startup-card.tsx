import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../ui/investor/card';
import { Button } from '../../ui/investor/button';

interface StartupCardProps {
  startup: {
    id: string;
    title: string;
    description: string;
    industry: string;
    imageUrl: string;
    fundingStage: 'seed' | 'series-a' | 'series-b' | 'series-c' | 'pre-seed';
    fundingNeeded: number;
    currentFunding: number;
    roiProjection: number;
    investmentTimeline: string;
  };
}

const stageColors = {
  'pre-seed': 'bg-gray-100 text-gray-800',
  'seed': 'bg-green-100 text-green-800', 
  'series-a': 'bg-blue-100 text-blue-800',
  'series-b': 'bg-purple-100 text-purple-800',
  'series-c': 'bg-orange-100 text-orange-800',
};

const stageLabels = {
  'pre-seed': 'Pre-Seed',
  'seed': 'Seed',
  'series-a': 'Series A',
  'series-b': 'Series B', 
  'series-c': 'Series C',
};

export default function StartupCard({ startup }: StartupCardProps) {
  const navigate = useNavigate();
  const {
    id,
    title,
    description,
    industry,
    imageUrl,
    fundingStage,
    fundingNeeded,
    currentFunding,
    roiProjection,
    investmentTimeline,
  } = startup;
  
  const fundingProgress = (currentFunding / fundingNeeded) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleViewDetails = () => {
    navigate(`/investor/browse-startups/${id}`);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stageColors[fundingStage]}`}>
            {stageLabels[fundingStage]}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
            {industry}
          </span>
        </div>
      </div>
      
      <CardContent className="flex-grow p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-black line-clamp-1">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
        
        {/* Funding Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-medium">{Math.round(fundingProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(fundingProgress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1 text-gray-500">
            <span>Raised: {formatCurrency(currentFunding)}</span>
            <span>Goal: {formatCurrency(fundingNeeded)}</span>
          </div>
        </div>

        {/* Investment Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500">ROI Projection</div>
            <div className="text-lg font-semibold text-green-600">{roiProjection}x</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Timeline</div>
            <div className="text-sm font-medium">{investmentTimeline}</div>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            variant="primary"
            onClick={handleViewDetails}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function StartupCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 animate-pulse"></div>
      <CardContent className="flex-grow p-4 flex flex-col">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="mt-2 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="mt-auto pt-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}

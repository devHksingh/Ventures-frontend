import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface InvestmentStatus {
  status: 'Active' | 'Completed' | 'Pending';
  color: string;
  bgColor: string;
}

const statusStyles: Record<string, InvestmentStatus> = {
  Active: { status: 'Active', color: 'text-green-700', bgColor: 'bg-green-100' },
  Completed: { status: 'Completed', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  Pending: { status: 'Pending', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
};

interface InvestmentCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  amount: number;
  date: string;
  status: 'Active' | 'Completed' | 'Pending';
  roi?: number;
  onClick: (id: string) => void;
}

export default function InvestmentCard({
  id,
  title,
  category,
  imageUrl,
  amount,
  date,
  status,
  roi,
  onClick,
}: InvestmentCardProps) {
  const { color, bgColor } = statusStyles[status];

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 h-40">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {category}
            </span>
          </div>
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} ${bgColor}`}
            >
              {status}
            </span>
          </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-700">Investment Amount</p>
              <p className="font-semibold">${amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Investment Date</p>
              <p className="font-semibold">{date}</p>
            </div>
            {roi !== undefined && (
              <div>
                <p className="text-sm text-gray-700">Return on Investment</p>
                <p className={`font-semibold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roi >= 0 ? '+' : ''}{roi}%
                </p>
              </div>
            )}
          </div>
          
          <Button
            variant="secondary"
            onClick={() => onClick(id)}
            className="w-full"
          >
            View Details
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}

export function InvestmentCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-40 bg-gray-200 animate-pulse"></div>
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-5 w-16 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
          
          <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
        </CardContent>
      </div>
    </Card>
  );
}

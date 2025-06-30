
import { Card, CardContent } from '../ui/card';

interface InvestmentChartProps {
  investmentDistribution: {
    category: string;
    amount: number;
    color: string;
  }[];
}

export default function InvestmentCharts({
  investmentDistribution = [],
}: InvestmentChartProps) {
  const total = investmentDistribution.reduce(
    (sum, item) => sum + item.amount, 
    0
  );
  
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Investment Distribution
        </h3>
        
        <div className="space-y-4">
          <div className="h-10 w-full flex rounded-lg overflow-hidden">
            {investmentDistribution.map((item, index) => (
              <div
                key={index}
                style={{
                  width: `${(item.amount / total) * 100}%`,
                  backgroundColor: item.color,
                }}
                className="h-full"
                title={`${item.category}: $${item.amount.toLocaleString()} (${Math.round((item.amount / total) * 100)}%)`}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {investmentDistribution.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="h-4 w-4 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.category}
                  </p>                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-700">
                      ${item.amount.toLocaleString()}
                    </p>
                    <p className="text-xs font-medium">
                      {Math.round((item.amount / total) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

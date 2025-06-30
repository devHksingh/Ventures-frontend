import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';

interface PortfolioPerformanceWidgetProps {
  isLoading?: boolean;
}

// Mock performance data that matches the portfolio page structure
const mockPerformanceData = {
  portfolio: [
    { date: '2024-06-01', totalValue: 255000 },
    { date: '2024-07-01', totalValue: 268000 },
    { date: '2024-08-01', totalValue: 285000 },
    { date: '2024-09-01', totalValue: 298000 },
    { date: '2024-10-01', totalValue: 320000 },
    { date: '2024-11-01', totalValue: 335000 },
    { date: '2024-12-01', totalValue: 348000 },
    { date: '2025-01-01', totalValue: 362000 },
    { date: '2025-02-01', totalValue: 378000 },
    { date: '2025-03-01', totalValue: 392000 },
    { date: '2025-04-01', totalValue: 410000 },
    { date: '2025-05-01', totalValue: 425000 },
    { date: '2025-06-01', totalValue: 442000 }
  ],
  benchmark: [
    { date: '2024-06-01', value: 4000 },
    { date: '2024-07-01', value: 4080 },
    { date: '2024-08-01', value: 4160 },
    { date: '2024-09-01', value: 4200 },
    { date: '2024-10-01', value: 4320 },
    { date: '2024-11-01', value: 4350 },
    { date: '2024-12-01', value: 4400 },
    { date: '2025-01-01', value: 4450 },
    { date: '2025-02-01', value: 4380 },
    { date: '2025-03-01', value: 4420 },
    { date: '2025-04-01', value: 4500 },
    { date: '2025-05-01', value: 4550 },
    { date: '2025-06-01', value: 4600 }
  ]
};

const PortfolioPerformanceWidget: React.FC<PortfolioPerformanceWidgetProps> = ({ isLoading = false }) => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState('6M');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter data based on selected time range
  const getFilteredData = () => {
    const now = new Date('2025-06-01');
    let startDate = new Date(now);
    
    switch (selectedTimeRange) {
      case '1M':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3M':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6M':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1Y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date('2024-06-01');
    }

    const filteredPortfolio = mockPerformanceData.portfolio.filter(
      item => new Date(item.date) >= startDate
    );
    const filteredBenchmark = mockPerformanceData.benchmark.filter(
      item => new Date(item.date) >= startDate
    );

    return { portfolio: filteredPortfolio, benchmark: filteredBenchmark };
  };

  // Prepare chart data
  const prepareChartData = () => {
    const { portfolio, benchmark } = getFilteredData();
    
    return portfolio.map((point, index) => {
      const benchmarkPoint = benchmark[index];
      const initialPortfolioValue = portfolio[0].totalValue;
      const initialBenchmarkValue = benchmark[0].value;
      
      return {
        date: format(parseISO(point.date), 'MMM dd'),
        portfolio: point.totalValue,
        benchmark: benchmarkPoint ? benchmarkPoint.value * (initialPortfolioValue / initialBenchmarkValue) : 0,
        portfolioReturn: ((point.totalValue - initialPortfolioValue) / initialPortfolioValue) * 100,
        benchmarkReturn: benchmarkPoint ? ((benchmarkPoint.value - initialBenchmarkValue) / initialBenchmarkValue) * 100 : 0
      };
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {['1M', '3M', '6M', '1Y'].map((period) => (
              <div key={period} className="px-3 py-1 bg-gray-200 rounded-md animate-pulse w-8 h-6"></div>
            ))}
          </div>
        </div>
        <div className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  const chartData = prepareChartData();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Performance vs Benchmark</h3>
          <button 
            onClick={() => navigate('/investor/portfolio/performance')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Detailed Analytics
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Time Range Selector */}
        <div className="flex justify-end mb-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {['1M', '3M', '6M', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimeRange(period)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedTimeRange === period
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toFixed(1)}%`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name.includes('Return') ? `${value.toFixed(1)}%` : formatCurrency(value),
                  name
                ]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="portfolio"
                fill="url(#portfolioGradient)"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={0.3}
                name="Portfolio Value"
                animationBegin={0}
                animationDuration={1500}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="portfolioReturn"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2, fill: '#fff' }}
                name="Portfolio Return %"
                animationBegin={200}
                animationDuration={1500}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="benchmarkReturn"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="8 8"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
                name="Benchmark Return %"
                animationBegin={400}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPerformanceWidget;

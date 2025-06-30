import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/investor/card';
import type { Portfolio, PerformanceData } from '../../../hooks/investor/portfolio/use-portfolio';
import { usePortfolioAnalytics } from '../../../hooks/investor/portfolio/use-portfolio-analytics';
import type { BenchmarkData } from '../../../hooks/investor/portfolio/use-portfolio-analytics';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  Area,
  ComposedChart
} from 'recharts';
import { format, parseISO } from 'date-fns';

interface PortfolioChartsProps {
  portfolio: Portfolio | null;
  isLoading: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const PortfolioCharts: React.FC<PortfolioChartsProps> = ({ portfolio, isLoading }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6M');
  const { analytics, getPerformanceComparison, getRiskReturnData } = usePortfolioAnalytics(portfolio);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No portfolio data available</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Time range selector component
  const TimeRangeSelector = () => {
    const ranges = ['1M', '3M', '6M', '1Y', 'All'];
    return (
      <div className="flex space-x-2">
        {ranges.map(range => (
          <button
            key={range}
            onClick={() => setSelectedTimeRange(range)}
            className={`px-3 py-1 text-sm rounded ${
              selectedTimeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    );
  };

  // Performance vs Benchmark Chart
  const PerformanceChart = () => {
    const comparisonData = getPerformanceComparison(selectedTimeRange);
    if (!comparisonData) return <div>No data available</div>;

    const chartData: Array<{ date: string; portfolio: number; benchmark: number; portfolioReturn: number; benchmarkReturn: number }> =
      comparisonData.portfolio.map((point: PerformanceData, index: number) => {
        const benchmarkPoint: BenchmarkData | undefined = comparisonData.benchmark[index];
        return {
          date: format(parseISO(point.date), 'MMM dd'),
          portfolio: point.totalValue,
          benchmark: benchmarkPoint ? benchmarkPoint.value * (point.totalValue / comparisonData.portfolio[0].totalValue) : 0,
          portfolioReturn: ((point.totalValue - comparisonData.portfolio[0].totalValue) / comparisonData.portfolio[0].totalValue) * 100,
          benchmarkReturn: benchmarkPoint ? ((benchmarkPoint.value - comparisonData.benchmark[0].value) / comparisonData.benchmark[0].value) * 100 : 0
        };
      });

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />          <Tooltip 
            formatter={(value: number, name: string) => [
              name.includes('Return') ? `${value.toFixed(1)}%` : formatCurrency(value),
              name
            ]}
          />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="portfolio"
            fill="#8884d8"
            stroke="#8884d8"
            fillOpacity={0.3}
            name="Portfolio Value"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="portfolioReturn"
            stroke="#0088FE"
            strokeWidth={2}
            name="Portfolio Return %"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="benchmarkReturn"
            stroke="#00C49F"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Benchmark Return %"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  // Enhanced Diversification Chart
  const DiversificationChart = () => {
    const data = portfolio.diversification.map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length]
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  // Risk-Return Scatter Plot
  const RiskReturnChart = () => {
    const data = getRiskReturnData();

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="risk"
            name="Risk"
            unit="%"
            domain={[0, 50]}
          />
          <YAxis
            type="number"
            dataKey="return"
            name="Return"
            unit="%"
            domain={[-20, 50]}
          />          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value: number, name: string) => [
              `${value}${name === 'return' ? '%' : name === 'risk' ? '%' : ''}`,
              name === 'return' ? 'Return' : name === 'risk' ? 'Risk' : name
            ]}
            labelFormatter={(label: string) => `Investment: ${label}`}
          />
          <Scatter
            name="Investments"
            data={data}
            fill="#8884d8"
          />
        </ScatterChart>
      </ResponsiveContainer>
    );
  };

  // Performance Metrics Card
  const PerformanceMetrics = () => {
    if (!analytics) return <div>Loading analytics...</div>;

    const metrics = [
      { label: 'CAGR', value: formatPercent(analytics.performanceMetrics.cagr), color: 'text-blue-600' },
      { label: 'Total Return', value: formatPercent(analytics.performanceMetrics.totalReturn), color: analytics.performanceMetrics.totalReturn >= 0 ? 'text-green-600' : 'text-red-600' },
      { label: 'Volatility', value: formatPercent(analytics.performanceMetrics.annualizedVolatility), color: 'text-orange-600' },
      { label: 'Sharpe Ratio', value: analytics.riskMetrics.sharpeRatio.toFixed(2), color: 'text-purple-600' },
      { label: 'Max Drawdown', value: formatPercent(analytics.riskMetrics.maxDrawdown), color: 'text-red-600' },
      { label: 'Alpha vs Benchmark', value: formatPercent(analytics.benchmarkComparison.alpha), color: analytics.benchmarkComparison.alpha >= 0 ? 'text-green-600' : 'text-red-600' }
    ];

    return (
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <p className="text-sm text-gray-500">{metric.label}</p>
            <p className={`text-lg font-semibold ${metric.color}`}>{metric.value}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Portfolio Analytics</h2>
        <TimeRangeSelector />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance vs Benchmark */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance vs Benchmark
            </h3>
            <PerformanceChart />
          </CardContent>
        </Card>

        {/* Portfolio Diversification */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Portfolio Diversification
            </h3>
            <DiversificationChart />
          </CardContent>
        </Card>

        {/* Risk-Return Analysis */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Risk-Return Analysis
            </h3>
            <RiskReturnChart />
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Key Performance Metrics
            </h3>
            <PerformanceMetrics />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioCharts;

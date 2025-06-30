import { useState, useEffect, useMemo } from 'react';
import type { Portfolio } from './use-portfolio';
import {
  calculateRiskMetrics,
  calculateCAGR,
  calculateDiversificationRatio,
  optimizePortfolio
} from '../../../lib/investor/utils/investment-calculations';
import type { RiskMetrics, PortfolioOptimization } from '../../../lib/investor/utils/investment-calculations';

export interface PortfolioAnalytics {
  performanceMetrics: {
    cagr: number;
    totalReturn: number;
    annualizedReturn: number;
    annualizedVolatility: number;
    bestYear: number;
    worstYear: number;
    positiveMonths: number;
    totalMonths: number;
  };
  riskMetrics: RiskMetrics;
  diversificationAnalysis: {
    diversificationRatio: number;
    concentrationRisk: number;
    correlationMatrix: number[][];
    categoryCounts: { [key: string]: number };
    riskDistribution: { [key: string]: number };
  };
  benchmarkComparison: {
    portfolioReturn: number;
    benchmarkReturn: number;
    alpha: number;
    beta: number;
    trackingError: number;
    informationRatio: number;
  };
  optimization: PortfolioOptimization;
}

export interface BenchmarkData {
  date: string;
  value: number;
  return: number;
}

// Mock benchmark data (S&P 500 equivalent)
const mockBenchmarkData: BenchmarkData[] = [
  { date: '2024-01-01', value: 4000, return: 0 },
  { date: '2024-02-01', value: 4080, return: 0.02 },
  { date: '2024-03-01', value: 4160, return: 0.0196 },
  { date: '2024-04-01', value: 4200, return: 0.0096 },
  { date: '2024-05-01', value: 4320, return: 0.0286 },
  { date: '2024-06-01', value: 4350, return: 0.0069 },
  { date: '2024-07-01', value: 4400, return: 0.0115 },
  { date: '2024-08-01', value: 4450, return: 0.0114 },
  { date: '2024-09-01', value: 4380, return: -0.0157 },
  { date: '2024-10-01', value: 4420, return: 0.0091 },
  { date: '2024-11-01', value: 4500, return: 0.0181 },
  { date: '2024-12-01', value: 4550, return: 0.0111 },
  { date: '2025-01-01', value: 4600, return: 0.011 },
  { date: '2025-02-01', value: 4650, return: 0.0109 },
  { date: '2025-03-01', value: 4700, return: 0.0108 },
  { date: '2025-04-01', value: 4750, return: 0.0106 },
  { date: '2025-05-01', value: 4800, return: 0.0105 },
  { date: '2025-06-01', value: 4850, return: 0.0104 }
];

export function usePortfolioAnalytics(portfolio: Portfolio | null) {
  const [benchmarkData] = useState<BenchmarkData[]>(mockBenchmarkData);
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const portfolioReturns = useMemo(() => {
    if (!portfolio?.performance || portfolio.performance.length < 2) return [];
    
    const returns: number[] = [];
    for (let i = 1; i < portfolio.performance.length; i++) {
      const prevValue = portfolio.performance[i - 1].totalValue;
      const currentValue = portfolio.performance[i].totalValue;
      if (prevValue > 0) {
        returns.push((currentValue - prevValue) / prevValue);
      }
    }
    return returns;
  }, [portfolio?.performance]);

  const benchmarkReturns = useMemo(() => {
    return benchmarkData.map(item => item.return).filter(r => r !== 0);
  }, [benchmarkData]);

  const calculateAnalytics = useMemo(() => {
    if (!portfolio || !portfolio.performance || portfolio.performance.length < 2) {
      return null;
    }

    // Performance Metrics
    const firstValue = portfolio.performance[0].totalValue;
    const lastValue = portfolio.performance[portfolio.performance.length - 1].totalValue;
    const firstDate = new Date(portfolio.performance[0].date);
    const lastDate = new Date(portfolio.performance[portfolio.performance.length - 1].date);
    const yearsDiff = (lastDate.getTime() - firstDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    
    const cagr = calculateCAGR(firstValue, lastValue, yearsDiff);
    const totalReturn = (lastValue - firstValue) / firstValue;
    const annualizedReturn = cagr;
    
    // Monthly returns for volatility calculation
    const monthlyReturns = portfolioReturns;
    const annualizedVolatility = monthlyReturns.length > 0 ? 
      Math.sqrt(monthlyReturns.reduce((sum, r) => sum + r * r, 0) / monthlyReturns.length) * Math.sqrt(12) : 0;
    
    const bestYear = Math.max(...monthlyReturns);
    const worstYear = Math.min(...monthlyReturns);
    const positiveMonths = monthlyReturns.filter(r => r > 0).length;
    const totalMonths = monthlyReturns.length;

    // Risk Metrics
    const portfolioValues = portfolio.performance.map(p => p.totalValue);
    const riskMetrics = calculateRiskMetrics(portfolioReturns, benchmarkReturns, portfolioValues);

    // Diversification Analysis
    const categoryCounts: { [key: string]: number } = {};
    const riskDistribution: { [key: string]: number } = {};
    
    portfolio.investments.forEach(inv => {
      categoryCounts[inv.category] = (categoryCounts[inv.category] || 0) + 1;
      riskDistribution[inv.riskLevel] = (riskDistribution[inv.riskLevel] || 0) + inv.amount;
    });

    // Simple correlation matrix (for demonstration)
    const categories = Object.keys(categoryCounts);
    const correlationMatrix = categories.map(() => 
      categories.map(() => Math.random() * 0.6 + 0.2) // Mock correlations
    );

    // Calculate diversification ratio
    const weights = portfolio.diversification.map(d => d.percentage / 100);
    const volatilities = weights.map(() => Math.random() * 0.3 + 0.1); // Mock volatilities
    const diversificationRatio = calculateDiversificationRatio(weights, volatilities, correlationMatrix);
    
    // Concentration risk (Herfindahl index)
    const concentrationRisk = weights.reduce((sum, w) => sum + w * w, 0);

    // Benchmark Comparison
    const portfolioReturn = totalReturn;
    const benchmarkReturn = benchmarkReturns.reduce((sum, r) => sum + r, 0);
    const alpha = portfolioReturn - benchmarkReturn;
    const beta = riskMetrics.beta;
    
    // Tracking error
    const trackingDifferences = portfolioReturns.map((pr, i) => 
      i < benchmarkReturns.length ? pr - benchmarkReturns[i] : 0
    );
    const trackingError = trackingDifferences.length > 0 ?
      Math.sqrt(trackingDifferences.reduce((sum, diff) => sum + diff * diff, 0) / trackingDifferences.length) : 0;
    
    const informationRatio = trackingError === 0 ? 0 : alpha / trackingError;

    // Portfolio Optimization
    const expectedReturns = portfolio.investments.map(inv => (inv.projectedROI || 10) / 100);
    const covMatrix = expectedReturns.map(() => 
      expectedReturns.map(() => Math.random() * 0.1 + 0.05) // Mock covariance
    );
    const optimization = optimizePortfolio(expectedReturns, covMatrix);

    return {
      performanceMetrics: {
        cagr,
        totalReturn,
        annualizedReturn,
        annualizedVolatility,
        bestYear,
        worstYear,
        positiveMonths,
        totalMonths
      },
      riskMetrics,
      diversificationAnalysis: {
        diversificationRatio,
        concentrationRisk,
        correlationMatrix,
        categoryCounts,
        riskDistribution
      },
      benchmarkComparison: {
        portfolioReturn,
        benchmarkReturn,
        alpha,
        beta,
        trackingError,
        informationRatio
      },
      optimization
    };
  }, [portfolio, portfolioReturns, benchmarkReturns]);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate calculation delay
    const timer = setTimeout(() => {
      setAnalytics(calculateAnalytics);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [calculateAnalytics]);
  const getPerformanceComparison = (timeRange: string) => {
    if (!portfolio?.performance || !benchmarkData) return null;

    let startIndex = 0;
    
    switch (timeRange) {
      case '1M':
        startIndex = Math.max(0, portfolio.performance.length - 1);
        break;
      case '3M':
        startIndex = Math.max(0, portfolio.performance.length - 3);
        break;
      case '6M':
        startIndex = Math.max(0, portfolio.performance.length - 6);
        break;
      case '1Y':
        startIndex = Math.max(0, portfolio.performance.length - 12);
        break;
      default:
        startIndex = 0;
    }

    const portfolioData = portfolio.performance.slice(startIndex);
    const benchmarkSlice = benchmarkData.slice(startIndex, startIndex + portfolioData.length);

    return {
      portfolio: portfolioData,
      benchmark: benchmarkSlice
    };
  };

  const getRiskReturnData = () => {
    if (!portfolio?.investments) return [];

    return portfolio.investments.map(inv => ({
      name: inv.title,
      risk: inv.riskLevel === 'Low' ? 10 : inv.riskLevel === 'Medium' ? 25 : 40,
      return: inv.roi || 0,
      amount: inv.amount,
      category: inv.category
    }));
  };

  return {
    analytics,
    isLoading,
    benchmarkData,
    getPerformanceComparison,
    getRiskReturnData,
    portfolioReturns,
    benchmarkReturns
  };
}

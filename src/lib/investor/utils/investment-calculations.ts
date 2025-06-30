/**
 * Investment calculation utilities for portfolio analytics
 */

export interface CashFlow {
  date: Date;
  amount: number; // Negative for outflows, positive for inflows
}

export interface RiskMetrics {
  volatility: number;
  sharpeRatio: number;
  beta: number;
  maxDrawdown: number;
  var95: number; // Value at Risk at 95% confidence
}

export interface PortfolioOptimization {
  expectedReturn: number;
  risk: number;
  weights: number[];
  sharpeRatio: number;
}

/**
 * Calculate Internal Rate of Return (IRR) using Newton-Raphson method
 */
export function calculateIRR(cashFlows: CashFlow[]): number {
  if (cashFlows.length < 2) return 0;

  // Sort by date
  const sortedFlows = [...cashFlows].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Convert to years from first cash flow
  const firstDate = sortedFlows[0].date;
  const flows = sortedFlows.map(cf => ({
    time: (cf.date.getTime() - firstDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
    amount: cf.amount
  }));

  let rate = 0.1; // Initial guess
  const tolerance = 1e-7;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;

    for (const flow of flows) {
      const discountFactor = Math.pow(1 + rate, -flow.time);
      npv += flow.amount * discountFactor;
      dnpv -= flow.amount * flow.time * discountFactor / (1 + rate);
    }

    if (Math.abs(npv) < tolerance) {
      return rate;
    }

    if (Math.abs(dnpv) < tolerance) {
      break; // Avoid division by zero
    }

    rate = rate - npv / dnpv;
  }

  return rate;
}

/**
 * Calculate Net Present Value (NPV)
 */
export function calculateNPV(cashFlows: CashFlow[], discountRate: number): number {
  if (cashFlows.length === 0) return 0;

  const sortedFlows = [...cashFlows].sort((a, b) => a.date.getTime() - b.date.getTime());
  const firstDate = sortedFlows[0].date;

  return sortedFlows.reduce((npv, cf) => {
    const years = (cf.date.getTime() - firstDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    const discountFactor = Math.pow(1 + discountRate, -years);
    return npv + cf.amount * discountFactor;
  }, 0);
}

/**
 * Calculate portfolio volatility (standard deviation of returns)
 */
export function calculateVolatility(returns: number[]): number {
  if (returns.length < 2) return 0;

  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
  
  return Math.sqrt(variance) * Math.sqrt(252); // Annualized
}

/**
 * Calculate Sharpe ratio (risk-adjusted return)
 */
export function calculateSharpeRatio(returns: number[], riskFreeRate: number = 0.02): number {
  if (returns.length < 2) return 0;

  const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const volatility = calculateVolatility(returns);

  if (volatility === 0) return 0;

  const annualizedReturn = meanReturn * 252;
  return (annualizedReturn - riskFreeRate) / volatility;
}

/**
 * Calculate Beta (correlation with market)
 */
export function calculateBeta(portfolioReturns: number[], marketReturns: number[]): number {
  if (portfolioReturns.length !== marketReturns.length || portfolioReturns.length < 2) {
    return 1; // Default beta
  }

  const portfolioMean = portfolioReturns.reduce((sum, r) => sum + r, 0) / portfolioReturns.length;
  const marketMean = marketReturns.reduce((sum, r) => sum + r, 0) / marketReturns.length;

  let covariance = 0;
  let marketVariance = 0;

  for (let i = 0; i < portfolioReturns.length; i++) {
    const portfolioDiff = portfolioReturns[i] - portfolioMean;
    const marketDiff = marketReturns[i] - marketMean;
    
    covariance += portfolioDiff * marketDiff;
    marketVariance += marketDiff * marketDiff;
  }

  if (marketVariance === 0) return 1;

  return covariance / marketVariance;
}

/**
 * Calculate Maximum Drawdown
 */
export function calculateMaxDrawdown(values: number[]): number {
  if (values.length < 2) return 0;

  let maxDrawdown = 0;
  let peak = values[0];

  for (let i = 1; i < values.length; i++) {
    if (values[i] > peak) {
      peak = values[i];
    } else {
      const drawdown = (peak - values[i]) / peak;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }
  }

  return maxDrawdown;
}

/**
 * Calculate Value at Risk (VaR) at 95% confidence level
 */
export function calculateVaR(returns: number[], confidenceLevel: number = 0.95): number {
  if (returns.length === 0) return 0;

  const sortedReturns = [...returns].sort((a, b) => a - b);
  const index = Math.floor((1 - confidenceLevel) * sortedReturns.length);
  
  return Math.abs(sortedReturns[index] || 0);
}

/**
 * Calculate comprehensive risk metrics
 */
export function calculateRiskMetrics(
  portfolioReturns: number[],
  marketReturns: number[] = [],
  portfolioValues: number[] = []
): RiskMetrics {
  const volatility = calculateVolatility(portfolioReturns);
  const sharpeRatio = calculateSharpeRatio(portfolioReturns);
  const beta = marketReturns.length > 0 ? calculateBeta(portfolioReturns, marketReturns) : 1;
  const maxDrawdown = portfolioValues.length > 0 ? calculateMaxDrawdown(portfolioValues) : 0;
  const var95 = calculateVaR(portfolioReturns);

  return {
    volatility,
    sharpeRatio,
    beta,
    maxDrawdown,
    var95
  };
}

/**
 * Calculate correlation between two return series
 */
export function calculateCorrelation(returns1: number[], returns2: number[]): number {
  if (returns1.length !== returns2.length || returns1.length < 2) {
    return 0;
  }

  const mean1 = returns1.reduce((sum, r) => sum + r, 0) / returns1.length;
  const mean2 = returns2.reduce((sum, r) => sum + r, 0) / returns2.length;

  let numerator = 0;
  let sum1Sq = 0;
  let sum2Sq = 0;

  for (let i = 0; i < returns1.length; i++) {
    const diff1 = returns1[i] - mean1;
    const diff2 = returns2[i] - mean2;
    
    numerator += diff1 * diff2;
    sum1Sq += diff1 * diff1;
    sum2Sq += diff2 * diff2;
  }

  const denominator = Math.sqrt(sum1Sq * sum2Sq);
  return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * Portfolio optimization using Mean-Variance optimization (simplified)
 */
export function optimizePortfolio(
  expectedReturns: number[],
  covarianceMatrix: number[][],
  riskFreeRate: number = 0.02
): PortfolioOptimization {
  const n = expectedReturns.length;
  
  if (n === 0 || covarianceMatrix.length !== n) {
    return {
      expectedReturn: 0,
      risk: 0,
      weights: [],
      sharpeRatio: 0
    };
  }

  // Simplified equal-weight optimization for now
  // In a real implementation, you'd use quadratic programming
  const weights = new Array(n).fill(1 / n);
  
  const expectedReturn = weights.reduce((sum, w, i) => sum + w * expectedReturns[i], 0);
  
  let portfolioVariance = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      portfolioVariance += weights[i] * weights[j] * covarianceMatrix[i][j];
    }
  }
  
  const risk = Math.sqrt(portfolioVariance);
  const sharpeRatio = risk === 0 ? 0 : (expectedReturn - riskFreeRate) / risk;

  return {
    expectedReturn,
    risk,
    weights,
    sharpeRatio
  };
}

/**
 * Calculate compound annual growth rate (CAGR)
 */
export function calculateCAGR(initialValue: number, finalValue: number, years: number): number {
  if (initialValue <= 0 || finalValue <= 0 || years <= 0) return 0;
  
  return Math.pow(finalValue / initialValue, 1 / years) - 1;
}

/**
 * Calculate portfolio diversification ratio
 */
export function calculateDiversificationRatio(weights: number[], volatilities: number[], correlationMatrix: number[][]): number {
  const n = weights.length;
  
  if (n === 0 || volatilities.length !== n || correlationMatrix.length !== n) {
    return 1;
  }

  // Weighted average of individual volatilities
  const weightedAvgVol = weights.reduce((sum, w, i) => sum + w * volatilities[i], 0);
  
  // Portfolio volatility
  let portfolioVariance = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      portfolioVariance += weights[i] * weights[j] * volatilities[i] * volatilities[j] * correlationMatrix[i][j];
    }
  }
  
  const portfolioVolatility = Math.sqrt(portfolioVariance);
  
  return portfolioVolatility === 0 ? 1 : weightedAvgVol / portfolioVolatility;
}

/**
 * Calculate tax-adjusted returns
 */
export function calculateTaxAdjustedReturn(
  grossReturn: number,
  capitalGainsTaxRate: number = 0.20,
  dividendTaxRate: number = 0.15,
  dividendYield: number = 0
): number {
  const capitalGainReturn = grossReturn - dividendYield;
  const afterTaxCapitalGain = capitalGainReturn * (1 - capitalGainsTaxRate);
  const afterTaxDividend = dividendYield * (1 - dividendTaxRate);
  
  return afterTaxCapitalGain + afterTaxDividend;
}

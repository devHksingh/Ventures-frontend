import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/investor/card';
import { Input } from '../../ui/investor/input';
import {
  calculateTaxAdjustedReturn
} from '../../../lib/investor/utils/investment-calculations';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface ROIProjection {
  year: number;
  investment: number;
  value: number;
  cashFlow: number;
  cumulativeReturn: number;
}

interface RiskAssessment {
  category: string;
  score: number;
  weight: number;
  description: string;
}

// Tax calculation result interface
interface TaxCalculationData {
  grossReturn: number;
  capitalGainsTax: number;
  dividendTax: number;
  netReturn: number;
  taxEfficiency: number;
}

const InvestmentCalculator: React.FC = () => {
  // ROI Calculator State
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timeHorizon, setTimeHorizon] = useState<number>(5);
  const [additionalInvestment, setAdditionalInvestment] = useState<number>(1000);
  const [projections, setProjections] = useState<ROIProjection[]>([]);

  // Risk Assessment State
  const [riskProfile, setRiskProfile] = useState<string>('moderate');
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment[]>([]);

  // Tax Calculator State
  const [capitalGainsTaxRate, setCapitalGainsTaxRate] = useState<number>(20);
  const [dividendTaxRate, setDividendTaxRate] = useState<number>(15);
  const [dividendYield, setDividendYield] = useState<number>(2);
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculationData | null>(null);

  // Active tab state
  const [activeTab, setActiveTab] = useState<string>('roi');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Calculate ROI Projections
  useEffect(() => {
    const calculateProjections = () => {
      const projectionData: ROIProjection[] = [];
      let currentValue = initialInvestment;
      let totalInvested = initialInvestment;

      for (let year = 1; year <= timeHorizon; year++) {
        // Add additional investment
        totalInvested += additionalInvestment;
        currentValue += additionalInvestment;
        
        // Apply expected return
        currentValue *= (1 + expectedReturn / 100);
        
        const cashFlow = year === timeHorizon ? currentValue - totalInvested : 0;
        const cumulativeReturn = ((currentValue - totalInvested) / totalInvested) * 100;

        projectionData.push({
          year,
          investment: totalInvested,
          value: currentValue,
          cashFlow,
          cumulativeReturn
        });
      }

      setProjections(projectionData);
    };

    calculateProjections();
  }, [initialInvestment, expectedReturn, timeHorizon, additionalInvestment]);

  // Calculate Risk Assessment
  useEffect(() => {
    const calculateRiskAssessment = () => {
      const riskFactors: RiskAssessment[] = [
        {
          category: 'Market Risk',
          score: riskProfile === 'conservative' ? 20 : riskProfile === 'moderate' ? 40 : 70,
          weight: 0.3,
          description: 'Exposure to market volatility'
        },
        {
          category: 'Sector Concentration',
          score: riskProfile === 'conservative' ? 15 : riskProfile === 'moderate' ? 35 : 60,
          weight: 0.25,
          description: 'Risk from sector concentration'
        },
        {
          category: 'Liquidity Risk',
          score: riskProfile === 'conservative' ? 10 : riskProfile === 'moderate' ? 25 : 50,
          weight: 0.2,
          description: 'Ability to exit positions quickly'
        },
        {
          category: 'Credit Risk',
          score: riskProfile === 'conservative' ? 5 : riskProfile === 'moderate' ? 20 : 40,
          weight: 0.15,
          description: 'Risk of default by issuers'
        },
        {
          category: 'Currency Risk',
          score: riskProfile === 'conservative' ? 8 : riskProfile === 'moderate' ? 18 : 35,
          weight: 0.1,
          description: 'Exposure to currency fluctuations'
        }
      ];

      setRiskAssessment(riskFactors);
    };

    calculateRiskAssessment();
  }, [riskProfile]);

  // Calculate Tax Implications
  useEffect(() => {
    if (projections.length > 0) {
      const finalProjection = projections[projections.length - 1];
      const grossReturn = finalProjection.cumulativeReturn / 100;
      
      const netReturn = calculateTaxAdjustedReturn(
        grossReturn,
        capitalGainsTaxRate / 100,
        dividendTaxRate / 100,
        dividendYield / 100
      );

      const capitalGainsTax = (grossReturn - dividendYield / 100) * (capitalGainsTaxRate / 100) * finalProjection.investment;
      const dividendTax = (dividendYield / 100) * (dividendTaxRate / 100) * finalProjection.investment;
      const taxEfficiency = netReturn / grossReturn;

      setTaxCalculation({
        grossReturn: grossReturn * 100,
        capitalGainsTax,
        dividendTax,
        netReturn: netReturn * 100,
        taxEfficiency: taxEfficiency * 100
      });
    }
  }, [projections, capitalGainsTaxRate, dividendTaxRate, dividendYield]);

  // ROI Calculator Tab
  const ROICalculatorTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Investment Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Investment
                </label>                <Input
                  type="number"
                  value={initialInvestment.toString()}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Return (%)
                </label>                <Input
                  type="number"
                  value={expectedReturn.toString()}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Horizon (Years)
                </label>                <Input
                  type="number"
                  value={timeHorizon.toString()}
                  onChange={(e) => setTimeHorizon(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Annual Investment
                </label>                <Input
                  type="number"
                  value={additionalInvestment.toString()}
                  onChange={(e) => setAdditionalInvestment(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Projection Summary</h3>
            {projections.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Invested:</span>
                  <span className="font-semibold">{formatCurrency(projections[projections.length - 1].investment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Final Value:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(projections[projections.length - 1].value)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Return:</span>
                  <span className="font-semibold text-blue-600">
                    {formatPercent(projections[projections.length - 1].cumulativeReturn)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(projections[projections.length - 1].value - projections[projections.length - 1].investment)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Growth Projection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Line type="monotone" dataKey="investment" stroke="#8884d8" name="Total Invested" />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Portfolio Value" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  // Risk Assessment Tab
  const RiskAssessmentTab = () => {
    const overallRiskScore = riskAssessment.reduce((sum, risk) => sum + risk.score * risk.weight, 0);
    const riskLevel = overallRiskScore < 20 ? 'Low' : overallRiskScore < 40 ? 'Moderate' : 'High';
    const riskColor = riskLevel === 'Low' ? 'text-green-600' : riskLevel === 'Moderate' ? 'text-yellow-600' : 'text-red-600';

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Profile Selection</h3>
            <div className="flex space-x-4">
              {['conservative', 'moderate', 'aggressive'].map((profile) => (
                <button
                  key={profile}
                  onClick={() => setRiskProfile(profile)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    riskProfile === profile
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {profile}
                </button>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Overall Risk Score:</span>
                <span className={`text-2xl font-bold ${riskColor}`}>
                  {overallRiskScore.toFixed(1)} ({riskLevel})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Factor Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskAssessment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Factors Breakdown</h3>
            <div className="space-y-3">
              {riskAssessment.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{risk.category}</h4>
                    <p className="text-sm text-gray-600">{risk.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{risk.score}/100</div>
                    <div className="text-xs text-gray-500">Weight: {(risk.weight * 100).toFixed(0)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Tax Calculator Tab
  const TaxCalculatorTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tax Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capital Gains Tax Rate (%)
                </label>                <Input
                  type="number"
                  value={capitalGainsTaxRate.toString()}
                  onChange={(e) => setCapitalGainsTaxRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dividend Tax Rate (%)
                </label>
                <Input
                  type="number"
                  value={dividendTaxRate.toString()}
                  onChange={(e) => setDividendTaxRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Dividend Yield (%)
                </label>
                <Input
                  type="number"
                  value={dividendYield.toString()}
                  onChange={(e) => setDividendYield(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tax Impact Analysis</h3>
            {taxCalculation && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Return:</span>
                  <span className="font-semibold">{formatPercent(taxCalculation.grossReturn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capital Gains Tax:</span>
                  <span className="font-semibold text-red-600">{formatCurrency(taxCalculation.capitalGainsTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dividend Tax:</span>
                  <span className="font-semibold text-red-600">{formatCurrency(taxCalculation.dividendTax)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Net Return:</span>
                  <span className="font-semibold text-green-600">{formatPercent(taxCalculation.netReturn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Efficiency:</span>
                  <span className="font-semibold">{formatPercent(taxCalculation.taxEfficiency)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {taxCalculation && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tax Optimization Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Tax-Advantaged Accounts</h4>
                <p className="text-sm text-blue-800">
                  Consider maximizing contributions to 401(k), IRA, and HSA accounts to defer taxes.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Tax-Loss Harvesting</h4>
                <p className="text-sm text-green-800">
                  Offset gains with losses to reduce your overall tax burden.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Long-Term Holdings</h4>
                <p className="text-sm text-purple-800">
                  Hold investments for over a year to qualify for lower long-term capital gains rates.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Asset Location</h4>
                <p className="text-sm text-orange-800">
                  Place tax-inefficient investments in tax-advantaged accounts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'roi', label: 'ROI Calculator' },
            { id: 'risk', label: 'Risk Assessment' },
            { id: 'tax', label: 'Tax Calculator' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'roi' && <ROICalculatorTab />}
      {activeTab === 'risk' && <RiskAssessmentTab />}
      {activeTab === 'tax' && <TaxCalculatorTab />}
    </div>
  );
};

export default InvestmentCalculator;

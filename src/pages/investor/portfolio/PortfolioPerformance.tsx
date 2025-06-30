import InvestorHeader from '../../../components/layouts/investor/investor-header';
import InvestmentPerformance from '../../../components/investor/portfolio/investment-performance';
import { Card, CardContent } from '../../../components/ui/investor/card';
import { usePortfolio } from '../../../hooks/investor/portfolio/use-portfolio';

export default function PortfolioPerformance() {
  const { portfolio, isLoading, error } = usePortfolio();
  
  if (error) {
    return (
      <>
        <InvestorHeader 
          title="Performance Error"
          subtitle="Unable to load performance data"
        />
        <div className="p-6">
          <div className="text-red-500">Error loading performance: {error.message}</div>
        </div>
      </>
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

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };
  
  return (
    <>
      <InvestorHeader 
        title="Performance Analytics"
        subtitle="Detailed ROI and performance metrics for your portfolio"
      />
      <div className="p-6">
        {/* Performance Summary */}
        {portfolio && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Performance Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Overall ROI</h3>
                  <p className={`text-3xl font-bold ${portfolio.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(portfolio.roi)}
                  </p>
                  <p className="text-sm text-black mt-1">
                    Total return on investment
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Net Gains</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(portfolio.totalValue - portfolio.totalInvested)}
                  </p>
                  <p className="text-sm text-black mt-1">
                    Unrealized gains/losses
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Average Return</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {formatPercentage(portfolio.investments.reduce((sum, inv) => sum + (inv.roi || 0), 0) / portfolio.investments.length)}
                  </p>
                  <p className="text-sm text-black mt-1">
                    Across all investments
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Individual Investment Performance */}
        <div className="mb-8">
          <h2 className="text-xl text-black font-semibold mb-4">Individual Investment Performance</h2>
          <InvestmentPerformance 
            portfolio={portfolio} 
            isLoading={isLoading} 
          />
        </div>

        {/* Tax Implications */}
        {portfolio && (
          <div>
            <h2 className="text-xl font-semibold text-black mb-4">Tax Implications</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="font-medium text-black mb-2">Capital Gains</h3>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(portfolio.taxImplications.capitalGains)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-2">Capital Losses</h3>
                    <p className="text-xl font-bold text-red-600">
                      {formatCurrency(portfolio.taxImplications.capitalLosses)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-2">Net Gains</h3>
                    <p className="text-xl font-bold text-blue-600">
                      {formatCurrency(portfolio.taxImplications.netGains)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-2">Estimated Tax</h3>
                    <p className="text-xl font-bold text-orange-600">
                      {formatCurrency(portfolio.taxImplications.estimatedTax)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Tax calculations are estimates based on a simplified 20% capital gains rate. 
                    Consult with a tax professional for accurate tax planning.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

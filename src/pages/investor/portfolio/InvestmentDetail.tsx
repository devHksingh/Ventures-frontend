import { useParams, useNavigate } from 'react-router-dom';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import { Card, CardContent } from '../../../components/ui/investor/card';
import { usePortfolio } from '../../../hooks/investor/portfolio/use-portfolio';

export default function InvestmentDetail() {
  const { investmentId } = useParams<{ investmentId: string }>();
  const navigate = useNavigate();
  const { portfolio, isLoading, error } = usePortfolio();

  const investment = portfolio?.investments.find((inv) => inv.id === investmentId);
  if (error) {
    return (
      <>
        <InvestorHeader 
          title="Investment Error"
          subtitle="Unable to load investment details"
        /> 
        <div className="p-6">
          <div className="text-red-500">Error loading investment: {error.message}</div>
        </div>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <InvestorHeader 
          title="Loading..."
          subtitle="Loading investment details"
        />
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </>
    );
  }
  if (!investment) {
    return (
      <>
        <InvestorHeader 
          title="Investment Not Found"
          subtitle="The requested investment could not be found"
        />        <div className="text-center py-12">
          <p className="text-black">Investment with ID "{investmentId}" not found.</p>
          <button 
            onClick={() => navigate('/investor/portfolio')} 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Return to Portfolio
          </button>
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <>
      <InvestorHeader 
        title={investment.title}
        subtitle={`Investment details and performance`}
      />
      <div className="p-6">
        {/* Investment Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <img 
                    src={investment.imageUrl} 
                    alt={investment.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="lg:w-2/3">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{investment.title}</h1>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(investment.status)}`}>
                          {investment.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(investment.riskLevel)}`}>
                          {investment.riskLevel} Risk
                        </span>
                        <span className="text-sm text-black">{investment.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-black">Invested Amount</p>
                      <p className="text-lg font-semibold">{formatCurrency(investment.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black">Current Value</p>
                      <p className="text-lg font-semibold">{formatCurrency(investment.currentValue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black">Current ROI</p>
                      <p className={`text-lg font-semibold ${(investment.roi || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(investment.roi || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-black">Projected ROI</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {formatPercentage(investment.projectedROI || 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-xl text-black font-semibold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-black mb-2">Gain/Loss</h3>
                <p className={`text-2xl font-bold ${investment.currentValue >= investment.amount ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(investment.currentValue - investment.amount)}
                </p>
                <p className="text-sm text-black mt-1">
                  Since investment date
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-black mb-2">Investment Date</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {new Date(investment.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-black mt-1">
                  Initial investment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-black mb-2">Time Held</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.floor((Date.now() - new Date(investment.date).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
                <p className="text-sm text-black mt-1">
                  Duration held
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="text-xl text-black font-semibold mb-4">Transaction History</h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-black">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-black">Type</th>
                      <th className="text-left py-3 text-sm font-medium text-black">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-black">Method</th>
                      <th className="text-left py-3 text-sm font-medium text-black">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investment.transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b last:border-0">
                        <td className="py-3 text-sm">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-sm capitalize">
                          {transaction.type}
                        </td>
                        <td className="py-3 text-sm">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="py-3 text-sm">
                          {transaction.paymentMethod}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>          </Card>
        </div>
      </div>
    </>
  );
}

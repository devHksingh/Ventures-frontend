import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, Building2, Clock, User, Sparkles, CircuitBoard, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileCircleButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-blue-200 shadow hover:bg-blue-50 transition-all"
      onClick={() => navigate("/profile")}
      aria-label="Profile"
      style={{ minWidth: 44, minHeight: 44 }}
    >
      <Avatar className="w-8 h-8">
        <AvatarImage src="/placeholder.svg" alt="Profile" />
        <AvatarFallback>AU</AvatarFallback>
      </Avatar>
    </button>
  );
};

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Mock data for demonstration
  const summaryData = {
    pendingVerification: 12,
    activeStartups: 45,
    pendingPayments: 8
  };

  const transactions = [
    {
      id: 'TXN001',
      startupName: 'TechFlow Solutions',
      investorName: 'John Smith',
      amount: 50000,
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 'TXN002',
      startupName: 'AI Innovations',
      investorName: 'Sarah Johnson',
      amount: 75000,
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: 'TXN003',
      startupName: 'GreenTech Ventures',
      investorName: 'Michael Brown',
      amount: 100000,
      status: 'processing',
      date: '2024-01-13'
    },
    {
      id: 'TXN004',
      startupName: 'HealthTech Pro',
      investorName: 'Emily Davis',
      amount: 25000,
      status: 'completed',
      date: '2024-01-12'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ef] min-h-screen px-2 md:px-8 py-8">
      {/* Header with Search and Profile */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-4 flex-1 max-w-2xl">
          <LayoutDashboard className="w-10 h-10 mr-2 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight drop-shadow">
            Dashboard
          </h1>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search transactions, startups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 rounded-xl border-2 border-blue-100 focus:border-blue-400 shadow-sm bg-white/80"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 shadow-lg font-semibold px-6 py-2 rounded-xl">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Generate Report
          </Button>
          <ProfileCircleButton />
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pending Verification Card */}
        <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 rounded-2xl">
          <div className="absolute top-0 right-0 w-36 h-36 bg-orange-200 rounded-full opacity-20 -translate-y-16 translate-x-16 blur-xl"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-orange-500 rounded-xl shadow">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <Badge className="bg-orange-500 text-white shadow">+2 this week</Badge>
            </div>
            <CardTitle className="text-base font-semibold text-orange-700 mt-3">
              Startups Awaiting Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold text-orange-600 mb-1 drop-shadow">
              {summaryData.pendingVerification}
            </div>
            <p className="text-base text-orange-600 font-medium">
              Pending approval
            </p>
          </CardContent>
        </Card>

        {/* Active Startups Card */}
        <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl">
          <div className="absolute top-0 right-0 w-36 h-36 bg-green-200 rounded-full opacity-20 -translate-y-16 translate-x-16 blur-xl"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-green-500 rounded-xl shadow">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <Badge className="bg-green-500 text-white shadow">+5 this month</Badge>
            </div>
            <CardTitle className="text-base font-semibold text-green-700 mt-3">
              Active Startups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold text-green-600 mb-1 drop-shadow">
              {summaryData.activeStartups}
            </div>
            <p className="text-base text-green-600 font-medium">
              Currently operating
            </p>
          </CardContent>
        </Card>

        {/* Pending Payments Card */}
        <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl">
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-200 rounded-full opacity-20 -translate-y-16 translate-x-16 blur-xl"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-500 rounded-xl shadow">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <Badge className="bg-blue-500 text-white shadow">-3 yesterday</Badge>
            </div>
            <CardTitle className="text-base font-semibold text-blue-700 mt-3">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold text-blue-600 mb-1 drop-shadow">
              {summaryData.pendingPayments}
            </div>
            <p className="text-base text-blue-600 font-medium">
              Awaiting transfer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Details Table */}
      <Card className="rounded-2xl shadow-lg border-0 bg-white/90">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-gray-800">Recent Transactions</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="rounded-lg border-blue-200 hover:border-blue-400">
                Filter by Date
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg border-blue-200 hover:border-blue-400">
                Filter by Status
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl overflow-hidden">
              <thead>
                <tr className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Startup Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Investor Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-blue-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                    <td className="py-3 px-4 font-medium">{transaction.startupName}</td>
                    <td className="py-3 px-4">{transaction.investorName}</td>
                    <td className="py-3 px-4 font-semibold text-blue-700">${transaction.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(transaction.status) + " rounded-lg px-3 py-1 font-semibold"}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  DollarSign, 
  Target, 
  Calendar, 
  Filter, 
  Download, 
  Share2, 
  BarChart3, 

  Activity,
  Clock,
  MapPin,
  Briefcase,
  Star,
  MousePointer,
  Heart,
  MessageCircle
} from 'lucide-react';

const StartupAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Sample analytics data
  const profileViewsData = [
    { date: '2025-05-01', views: 45, uniqueViews: 38, bounceRate: 25 },
    { date: '2025-05-03', views: 62, uniqueViews: 51, bounceRate: 22 },
    { date: '2025-05-05', views: 78, uniqueViews: 65, bounceRate: 18 },
    { date: '2025-05-07', views: 89, uniqueViews: 73, bounceRate: 20 },
    { date: '2025-05-09', views: 94, uniqueViews: 82, bounceRate: 15 },
    { date: '2025-05-11', views: 107, uniqueViews: 91, bounceRate: 17 },
    { date: '2025-05-13', views: 125, uniqueViews: 108, bounceRate: 14 },
    { date: '2025-05-15', views: 134, uniqueViews: 119, bounceRate: 12 },
    { date: '2025-05-17', views: 142, uniqueViews: 127, bounceRate: 16 },
    { date: '2025-05-19', views: 156, uniqueViews: 138, bounceRate: 11 },
    { date: '2025-05-21', views: 178, uniqueViews: 162, bounceRate: 9 },
    { date: '2025-05-23', views: 189, uniqueViews: 171, bounceRate: 13 },
    { date: '2025-05-25', views: 201, uniqueViews: 185, bounceRate: 8 },
    { date: '2025-05-27', views: 225, uniqueViews: 203, bounceRate: 10 },
    { date: '2025-05-29', views: 242, uniqueViews: 219, bounceRate: 7 },
    { date: '2025-06-01', views: 267, uniqueViews: 241, bounceRate: 6 }
  ];

  const bidFrequencyData = [
    { month: 'Jan', applications: 8, responses: 3, interviews: 1 },
    { month: 'Feb', applications: 12, responses: 5, interviews: 2 },
    { month: 'Mar', applications: 15, responses: 8, interviews: 4 },
    { month: 'Apr', applications: 18, responses: 11, interviews: 6 },
    { month: 'May', applications: 22, responses: 14, interviews: 8 },
    { month: 'Jun', applications: 25, responses: 18, interviews: 12 }
  ];

  const investorInterestData = [
    { category: 'VC Firms', interest: 35, color: '#3B82F6' },
    { category: 'Angel Investors', interest: 28, color: '#10B981' },
    { category: 'Corporate VCs', interest: 20, color: '#F59E0B' },
    { category: 'Family Offices', interest: 12, color: '#EF4444' },
    { category: 'Accelerators', interest: 5, color: '#8B5CF6' }
  ];

  const geographicData = [
    { region: 'North America', investors: 45, percentage: 42 },
    { region: 'Europe', investors: 32, percentage: 30 },
    { region: 'Asia Pacific', investors: 18, percentage: 17 },
    { region: 'Middle East', investors: 8, percentage: 7 },
    { region: 'Others', investors: 4, percentage: 4 }
  ];

  const engagementData = [
    { week: 'Week 1', profileViews: 156, documentDownloads: 23, messages: 8, meetings: 2 },
    { week: 'Week 2', profileViews: 189, documentDownloads: 31, messages: 12, meetings: 4 },
    { week: 'Week 3', profileViews: 234, documentDownloads: 28, messages: 15, meetings: 6 },
    { week: 'Week 4', profileViews: 267, documentDownloads: 35, messages: 18, meetings: 8 }
  ];

  const keyMetrics = [
    {
      title: 'Total Profile Views',
      value: '3,247',
      change: '+23.5%',
      trend: 'up',
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Unique Visitors',
      value: '2,891',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Active Applications',
      value: '25',
      change: '+12.0%',
      trend: 'up',
      icon: FileText,
      color: 'purple'
    },
    {
      title: 'Investor Interest',
      value: '89%',
      change: '+5.3%',
      trend: 'up',
      icon: Heart,
      color: 'red'
    }
  ];

  const topPerformingContent = [
    { content: 'Pitch Deck v3.2', views: 456, downloads: 89, engagement: 19.5 },
    { content: 'Business Model Canvas', views: 378, downloads: 67, engagement: 17.7 },
    { content: 'Financial Projections', views: 334, downloads: 78, engagement: 23.4 },
    { content: 'Product Demo Video', views: 289, downloads: 45, engagement: 15.6 },
    { content: 'Market Analysis', views: 267, downloads: 52, engagement: 19.5 }
  ];

  const investorActivityData = [
    { date: '2025-06-01', activity: 'Profile View', investor: 'Sequoia Capital', type: 'VC Firm' },
    { date: '2025-06-01', activity: 'Document Download', investor: 'Sarah Chen', type: 'Angel Investor' },
    { date: '2025-05-31', activity: 'Message Sent', investor: 'Innovation Ventures', type: 'VC Firm' },
    { date: '2025-05-31', activity: 'Meeting Scheduled', investor: 'Tech Accelerator', type: 'Accelerator' },
    { date: '2025-05-30', activity: 'Profile View', investor: 'Growth Capital', type: 'Corporate VC' },
    { date: '2025-05-30', activity: 'Document Download', investor: 'Michael Rodriguez', type: 'Angel Investor' },
    { date: '2025-05-29', activity: 'Application Response', investor: 'Future Fund', type: 'VC Firm' },
    { date: '2025-05-29', activity: 'Profile View', investor: 'Lisa Wang', type: 'Family Office' }
  ];

  const StatCard = ({ metric }) => {
    const IconComponent = metric.icon;
    const isPositive = metric.trend === 'up';
    
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
            <IconComponent className={`w-6 h-6 text-${metric.color}-600`} />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {metric.change}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
          <p className="text-gray-600 text-sm mt-1">{metric.title}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your startup's performance and investor engagement</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <StatCard key={index} metric={metric} />
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profile Views Trend */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Profile Views Trend</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Total Views
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Unique Views
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={profileViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value, name) => [value, name === 'views' ? 'Total Views' : 'Unique Views']}
                />
                <Area type="monotone" dataKey="views" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="uniqueViews" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Application Success Rate */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Application Performance</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bidFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
                <Bar dataKey="responses" fill="#10B981" name="Responses" />
                <Bar dataKey="interviews" fill="#F59E0B" name="Interviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Investor Interest by Type */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Investor Interest by Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={investorInterestData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="interest"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {investorInterestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Geographic Distribution</h3>
            <div className="space-y-4">
              {geographicData.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{region.region}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${region.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{region.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Engagement</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="messages" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="meetings" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Performance & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Performing Content */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Content</h3>
            <div className="space-y-4">
              {topPerformingContent.map((content, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{content.content}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {content.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {content.downloads} downloads
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{content.engagement}%</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Investor Activity */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Investor Activity</h3>
            <div className="space-y-4">
              {investorActivityData.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {activity.activity === 'Profile View' && <Eye className="w-4 h-4 text-blue-600" />}
                    {activity.activity === 'Document Download' && <Download className="w-4 h-4 text-blue-600" />}
                    {activity.activity === 'Message Sent' && <MessageCircle className="w-4 h-4 text-blue-600" />}
                    {activity.activity === 'Meeting Scheduled' && <Calendar className="w-4 h-4 text-blue-600" />}
                    {activity.activity === 'Application Response' && <FileText className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.activity}</div>
                    <div className="text-sm text-gray-600">{activity.investor} • {activity.type}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            AI-Powered Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-medium text-gray-900">Growing Interest</span>
              </div>
              <p className="text-sm text-gray-600">
                Your profile views increased by 45% this week. VC firms are showing particularly high interest.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-900">Optimization Tip</span>
              </div>
              <p className="text-sm text-gray-600">
                Your pitch deck has the highest engagement rate. Consider updating other documents to match this quality.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-gray-900">Best Time</span>
              </div>
              <p className="text-sm text-gray-600">
                Investors are most active on Tuesdays and Wednesdays. Schedule your outreach accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupAnalyticsDashboard;
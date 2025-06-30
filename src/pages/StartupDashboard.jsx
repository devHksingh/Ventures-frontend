import React, { useState, useEffect } from 'react';
import { Search, Menu, X, TrendingUp, DollarSign, Users, MessageSquare, ChevronRight, Bell, User, PlusCircle, FileText, Handshake, Sidebar, Calendar, Filter, Download, Eye, Star, Clock, Target, Zap, BarChart3, Settings, RefreshCw, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import {StartupHeader} from '../components/StartupHeader';
const StartupDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fundingProgress, setFundingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState('/');
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setFundingProgress(68);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path) => {
    setCurrentPage(path);
    setSidebarOpen(false);
  };

  const fundingCards = [
    { 
      title: 'Total Funding', 
      amount: '$125,000', 
      change: '+12%', 
      color: 'bg-green-500',
      trend: 'up',
      subtitle: 'vs last month'
    },
    { 
      title: 'Active Bids', 
      amount: '23', 
      change: '+5', 
      color: 'bg-blue-500',
      trend: 'up',
      subtitle: 'this week'
    },
    { 
      title: 'Pending Deals', 
      amount: '8', 
      change: '+2', 
      color: 'bg-orange-500',
      trend: 'up',
      subtitle: 'awaiting response'
    },
    { 
      title: 'Success Rate', 
      amount: '84%', 
      change: '+3%', 
      color: 'bg-purple-500',
      trend: 'up',
      subtitle: 'conversion rate'
    }
  ];

  const investorMatches = [
    { 
      name: 'John Smith', 
      company: 'Venture Capital LLC', 
      match: '95%', 
      avatar: 'JS',
      status: 'interested',
      lastContact: '2h ago',
      funding: '$50K-500K'
    },
    { 
      name: 'Sarah Johnson', 
      company: 'Angel Investors Group', 
      match: '87%', 
      avatar: 'SJ',
      status: 'reviewing',
      lastContact: '1d ago',
      funding: '$25K-250K'
    },
    { 
      name: 'Mike Chen', 
      company: 'Tech Fund Partners', 
      match: '82%', 
      avatar: 'MC',
      status: 'contacted',
      lastContact: '3d ago',
      funding: '$100K-1M'
    },
    { 
      name: 'Lisa Rodriguez', 
      company: 'Innovation Capital', 
      match: '78%', 
      avatar: 'LR',
      status: 'new',
      lastContact: 'Never',
      funding: '$75K-750K'
    }
  ];

  const recentMessages = [
    { 
      from: 'Alex Thompson', 
      message: 'Interested in your AI project proposal...', 
      time: '2h ago', 
      unread: true,
      priority: 'high',
      type: 'funding'
    },
    { 
      from: 'Maria Garcia', 
      message: 'Can we schedule a meeting to discuss...', 
      time: '4h ago', 
      unread: false,
      priority: 'medium',
      type: 'meeting'
    },
    { 
      from: 'David Wilson', 
      message: 'Great presentation yesterday! Let\'s...', 
      time: '1d ago', 
      unread: false,
      priority: 'low',
      type: 'feedback'
    },
    { 
      from: 'Emma Davis', 
      message: 'Following up on our conversation...', 
      time: '2d ago', 
      unread: false,
      priority: 'medium',
      type: 'followup'
    }
  ];

  const notifications = [
    { id: 1, text: 'New investor match found', type: 'success', time: '1h ago' },
    { id: 2, text: 'Funding milestone reached', type: 'success', time: '2h ago' },
    { id: 3, text: 'Meeting reminder in 30 minutes', type: 'warning', time: '3h ago' },
    { id: 4, text: 'Document requires signature', type: 'info', time: '5h ago' }
  ];

  const upcomingTasks = [
    { task: 'Prepare pitch deck for TechVC', due: 'Today 3:00 PM', priority: 'high' },
    { task: 'Follow up with Angel Investors', due: 'Tomorrow 10:00 AM', priority: 'medium' },
    { task: 'Review legal documents', due: 'Nov 28', priority: 'medium' },
    { task: 'Update financial projections', due: 'Nov 30', priority: 'low' }
  ];

  const quickActions = [
    { icon: PlusCircle, label: 'Create New Pitch', color: 'bg-blue-500' },
    { icon: FileText, label: 'Upload Documents', color: 'bg-green-500' },
    { icon: Users, label: 'Find Investors', color: 'bg-purple-500' },
    { icon: Calendar, label: 'Schedule Meeting', color: 'bg-orange-500' },
    { icon: BarChart3, label: 'View Analytics', color: 'bg-pink-500' },
    { icon: Settings, label: 'Account Settings', color: 'bg-gray-500' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'interested': return 'bg-green-100 text-green-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'new': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={16} />;
      case 'warning': return <AlertCircle className="text-yellow-500" size={16} />;
      case 'info': return <Bell className="text-blue-500" size={16} />;
      default: return <Bell className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white w-full border-b border-gray-200 shadow-sm">
        <StartupHeader />
        </div>

        <div className="flex">
      <main className="flex-1 p-6"> 
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {fundingCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-l-4 border-transparent hover:border-blue-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.amount}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm text-green-600 font-medium">{card.change}</p>
                      <span className="text-xs text-gray-500">{card.subtitle}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                    <TrendingUp className="text-white" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Enhanced Funding Progress */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Funding Progress</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">$68K of $100K</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${fundingProgress}%` }}
                >
                  <span className="text-xs text-white font-medium">68%</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">$68K</p>
                  <p className="text-sm text-gray-600">Raised</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">32</p>
                  <p className="text-sm text-gray-600">Days Left</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">15</p>
                  <p className="text-sm text-gray-600">Backers</p>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
                <Clock size={20} className="text-gray-400" />
              </div>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)} bg-gray-50`}>
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-600 mt-1">{task.due}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all tasks
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Enhanced Bid Status */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Bid Status</h3>
                <Filter size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Accepted</p>
                    <p className="text-sm text-green-600">5 bids</p>
                  </div>
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-800">Pending</p>
                    <p className="text-sm text-yellow-600">12 bids</p>
                  </div>
                  <Clock className="text-yellow-500" size={24} />
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-red-800">Rejected</p>
                    <p className="text-sm text-red-600">3 bids</p>
                  </div>
                  <XCircle className="text-red-500" size={24} />
                </div>
              </div>
            </div>

            {/* Enhanced Investor Matches */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Top Matches</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Find More
                </button>
              </div>
              <div className="space-y-4">
                {investorMatches.slice(0, 3).map((investor, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {investor.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 text-sm">{investor.name}</p>
                        <span className="text-sm font-medium text-green-600">{investor.match}</span>
                      </div>
                      <p className="text-xs text-gray-600">{investor.company}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investor.status)}`}>
                          {investor.status}
                        </span>
                        <span className="text-xs text-gray-500">{investor.funding}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Recent Messages */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {recentMessages.filter(m => m.unread).length}
                  </span>
                  <MessageSquare size={20} className="text-gray-400" />
                </div>
              </div>
              <div className="space-y-3">
                {recentMessages.map((message, index) => (
                  <div key={index} className={`p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border-l-4 ${getPriorityColor(message.priority)}`}>
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-gray-900 text-sm">{message.from}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">{message.time}</span>
                        {message.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.message}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {message.type}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center space-x-1">
                <span>View all messages</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StartupDashboard;
import React, { useState } from 'react';
import { Search, Bell, Zap, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export const StartupHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  const notifications = [
    { id: 1, text: 'New investor match found', type: 'success', time: '1h ago' },
    { id: 2, text: 'Funding milestone reached', type: 'success', time: '2h ago' },
    { id: 3, text: 'Meeting reminder in 30 minutes', type: 'warning', time: '3h ago' },
    { id: 4, text: 'Document requires signature', type: 'info', time: '5h ago' }
  ];

  const quickActions = [
    { icon: 'PlusCircle', label: 'Create New Pitch', color: 'bg-blue-500' },
    { icon: 'FileText', label: 'Upload Documents', color: 'bg-green-500' },
    { icon: 'Users', label: 'Find Investors', color: 'bg-purple-500' },
    { icon: 'Calendar', label: 'Schedule Meeting', color: 'bg-orange-500' },
    { icon: 'BarChart3', label: 'View Analytics', color: 'bg-pink-500' },
    { icon: 'Settings', label: 'Account Settings', color: 'bg-gray-500' }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={16} />;
      case 'warning': return <AlertCircle className="text-yellow-500" size={16} />;
      case 'info': return <Bell className="text-blue-500" size={16} />;
      default: return <Bell className="text-gray-500" size={16} />;
    }
  };

  return (
    <>
      {/* Enhanced Header - Fixed to remaining space after sidebar */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-64 right-0 z-50 lg:left-64 md:left-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Hide title on smaller screens since sidebar handles it */}
              <h1 className="text-2xl font-bold text-gray-900 hidden lg:block">User Dashboard</h1>
              
              {/* Search Bar */}
              <div className="flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search investors, deals, messages..."
                  className="pl-10 pr-4 py-2 w-60 lg:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Time Range Filter */}
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hidden sm:block"
              >
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>

              

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications.filter(n => n.id <= 2).length}
                  </span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{notification.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              

              {/* Profile */}
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Actions Sidebar */}
      {showQuickActions && (
        <div className="fixed top-20 right-6 bg-white rounded-lg shadow-lg border border-gray-200 z-40 p-4 w-64">
          
          
        </div>
      )}
    </>
  );
};

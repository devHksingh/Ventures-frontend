import React, { useState } from 'react';
import { Search, Menu, X, TrendingUp, DollarSign, Users, MessageSquare, ChevronRight, Bell, User, PlusCircle, FileText, Handshake } from 'lucide-react';
import {
  LayoutDashboard,
  Lightbulb,
  FolderKanban,
  HandCoins,
  BadgeDollarSign,

  BarChart3,
  UserCircle
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/startupDashboard' },
  { name: 'Pitch Ideas', icon: Lightbulb, path: '/pitch' },
  { name: 'My Ideas', icon: FolderKanban, path: '/my-ideas' },
  { name: 'Bids', icon: HandCoins, path: '/bids' },
  { name: 'Funding Selection', icon: BadgeDollarSign, path: '/funding' },
  { name: 'Deals', icon: Handshake, path: '/deals' },
  { name: 'Analytics', icon: BarChart3, path: '/startup-analytics' },
  { name: 'Profile', icon: UserCircle, path: '/startprofile' },
];

export const SidebarS = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  


  const handleNavigation = (path) => {
    setCurrentPage(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
    
    // Navigate using browser's history API
    window.history.pushState({}, '', path);
    
    // Dispatch a custom event to notify React Router of the navigation
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } pt-16 lg:pt-0`}>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                currentPage === item.path
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { StartupVerification } from '@/components/StartupVerification';
import { Users } from '@/components/Users';
import { Payments } from '@/components/Payments';
import Profile from '@/components/AdminProfile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'verification':
        return <StartupVerification />;
      case 'users':
        return <Users />;
      case 'payments':
        return <Payments />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;

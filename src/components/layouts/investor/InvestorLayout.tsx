import React from 'react';
import { Outlet } from 'react-router-dom';
import InvestorSidebar from '../../investor/InvestorSidebar';

interface InvestorLayoutProps {
  children?: React.ReactNode;
}

const InvestorLayout = ({ children }: InvestorLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <InvestorSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6 md:p-8 pt-20 md:pt-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default InvestorLayout;
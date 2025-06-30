import React from 'react';
import { SidebarS } from '../SidebarS';
import { Outlet } from 'react-router-dom';

const StartupLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarS />

      <main className="flex-1 bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default StartupLayout;

import React from 'react';
import { Sidebar } from '../Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-4">
        <Outlet /> {/* This is where the child route components will render */}
      </main>
    </div>
  );
};

export default AdminLayout;

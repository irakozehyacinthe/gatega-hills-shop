import React from 'react';
import { Outlet } from 'react-router';
import { AdminSidebar } from '../components/AdminSidebar';

export function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

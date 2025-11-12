import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
      return (
          <div className="min-h-screen flex flex-col">
              <Navbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
              <main className="flex-grow">
                  <Outlet />
              </main>
          </div>
      );
  }

  return (
    <div 
      className="h-screen flex overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1965&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-slate-900/40 z-0" />
      <div className="relative z-10 flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <Navbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

import React from 'react';
import { Menu, Bell, Search, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { admin, logout } = useAuth();

  return (
    <header className="gradient-card border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:gradient-primary gradient-hover lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your platform efficiently</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search anything..."
              className="block w-80 pl-10 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 gradient-hover"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-3 text-gray-400 hover:text-white hover:gradient-primary rounded-xl gradient-hover">
            <Bell className="h-6 w-6" />
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3 gradient-card px-4 py-2 rounded-xl">
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-100"
                src={admin?.avatar}
                alt={admin?.name}
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">{admin?.name}</div>
              <div className="text-xs text-gray-500">{admin?.email}</div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-white hover:gradient-primary rounded-lg gradient-hover"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
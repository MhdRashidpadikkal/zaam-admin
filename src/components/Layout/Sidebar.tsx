import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Building2
} from 'lucide-react';
import logo from '../../assets/zaam_logo_white.png';

interface SidebarProps {
  isOpen: boolean;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Applicants', href: '/applicants', icon: FileText },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 gradient-card transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-6 gradient-primary">
          <img src={logo} alt="Logo" className="h-14 w-14" />
          <div className="ml-3">
            <h1 className="text-xl font-bold text-white">ZAAM</h1>
            <p className="text-xs text-blue-100">Job Mediate</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 bg-white">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 gradient-hover ${
                  isActive
                    ? 'gradient-primary text-white shadow-lg'
                    : 'text-gray-700 hover:gradient-secondary hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="text-xs text-gray-500">
            <div className="font-medium text-gradient">Version 2.1.0</div>
            <div className="mt-1">© 2025 ZAAM Job Mediate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
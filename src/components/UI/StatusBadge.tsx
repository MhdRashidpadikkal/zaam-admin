import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'dot';
}

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  blocked: 'bg-red-100 text-red-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-blue-100 text-blue-800',
  draft: 'bg-gray-100 text-gray-800',
};

const dotStyles: Record<string, string> = {
  active: 'bg-green-400',
  inactive: 'bg-gray-400',
  pending: 'bg-yellow-400',
  approved: 'bg-green-400',
  rejected: 'bg-red-400',
  blocked: 'bg-red-400',
  completed: 'bg-green-400',
  failed: 'bg-red-400',
  refunded: 'bg-blue-400',
  draft: 'bg-gray-400',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default' }) => {
  if (variant === 'dot') {
    return (
      <div className="flex items-center">
        <div className={`h-2 w-2 rounded-full mr-2 ${dotStyles[status] || 'bg-gray-400'}`} />
        <span className="text-sm text-gray-700 capitalize">{status}</span>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};
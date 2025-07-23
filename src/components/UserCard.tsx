import React from 'react';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { ApprovalStatus, User as UserType } from '../App';

interface UserCardProps {
  user: UserType;
  status: ApprovalStatus;
  isActive: boolean;
  delay?: number;
}

export function UserCard({ user, status, isActive, delay = 0 }: UserCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      case 'pending':
        return Clock;
      default:
        return User;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return 'border-green-400 bg-green-500/20';
      case 'rejected':
        return 'border-red-400 bg-red-500/20';
      case 'pending':
        return 'border-yellow-400 bg-yellow-500/20';
      default:
        return 'border-gray-400 bg-gray-500/20';
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <div 
      className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transition-all duration-1000 hover:scale-105 hover:bg-white/15 ${
        isActive ? 'shadow-xl' : 'shadow-lg'
      }`}
      style={{
        animationDelay: `${delay}ms`,
        animation: isActive ? 'slideInUp 1.2s ease-out' : 'none'
      }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
          />
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${getStatusColor()}`}>
            <StatusIcon className="w-3 h-3 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-white">{user.name}</h4>
          <p className="text-sm text-white/80">{user.role}</p>
        </div>
      </div>
      
      <div className="text-xs text-white/60">
        <p className="mb-1">{user.department}</p>
        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
          status === 'approved' 
            ? 'bg-green-500/30 text-green-200 border border-green-400/30'
            : status === 'pending'
            ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/30'
            : status === 'rejected'
            ? 'bg-red-500/30 text-red-200 border border-red-400/30'
            : 'bg-gray-500/30 text-gray-200 border border-gray-400/30'
        }`}>
          {status === 'inactive' ? 'Waiting' : status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </div>
  );
}
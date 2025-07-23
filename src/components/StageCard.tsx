import React from 'react';
import { CheckCircle, XCircle, Clock, Users, UserCheck, Shield, Building2 } from 'lucide-react';
import { ApprovalStatus, Stage } from '../App';

interface StageCardProps {
  stage: Stage;
  status: ApprovalStatus;
  isActive: boolean;
  stageNumber: number;
}

const getStageIcon = (stageId: string) => {
  switch (stageId) {
    case 'partner-creation':
      return Users;
    case 'commercial-approval':
      return Building2;
    case 'parallel-approval':
      return UserCheck;
    case 'ready-activation':
      return Shield;
    default:
      return Users;
  }
};

const getStatusIcon = (status: ApprovalStatus) => {
  switch (status) {
    case 'approved':
      return CheckCircle;
    case 'rejected':
      return XCircle;
    case 'pending':
      return Clock;
    default:
      return Clock;
  }
};

const getStatusColor = (status: ApprovalStatus) => {
  switch (status) {
    case 'approved':
      return 'from-green-500 to-emerald-600';
    case 'rejected':
      return 'from-red-500 to-rose-600';
    case 'pending':
      return 'from-yellow-500 to-orange-600';
    default:
      return 'from-gray-500 to-slate-600';
  }
};

const getStatusText = (status: ApprovalStatus) => {
  switch (status) {
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    case 'pending':
      return 'Pending';
    default:
      return 'Inactive';
  }
};

export function StageCard({ stage, status, isActive, stageNumber }: StageCardProps) {
  const StageIcon = getStageIcon(stage.id);
  const StatusIcon = getStatusIcon(status);
  const statusColor = getStatusColor(status);
  const statusText = getStatusText(status);

  return (
    <div className={`relative transition-all duration-1200 ${
      isActive ? 'scale-105' : 'scale-100'
    }`}>
      {/* Stage Number */}
      <div className="absolute -left-4 top-6 z-10">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-1000 ${
          status === 'approved' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
            : status === 'pending'
            ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg animate-pulse'
            : status === 'rejected'
            ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
            : 'bg-gray-500 text-white'
        }`}>
          {stageNumber}
        </div>
      </div>

      <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border transition-all duration-1000 ${
        isActive 
          ? 'border-white/40 shadow-2xl' 
          : 'border-white/20 shadow-lg'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r transition-all duration-800 ${
              isActive ? 'from-blue-500 to-purple-600' : 'from-gray-600 to-gray-700'
            }`}>
              <StageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{stage.title}</h3>
              {stage.isParallel && (
                <span className="inline-block mt-1 px-3 py-1 bg-purple-500/30 text-purple-200 text-sm rounded-full border border-purple-400/30">
                  Parallel Approval Required
                </span>
              )}
            </div>
          </div>
          
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r ${statusColor} transition-all duration-1000`}>
            <StatusIcon className="w-5 h-5 text-white" />
            <span className="font-medium text-white">{statusText}</span>
          </div>
        </div>
        
        <p className="text-white/80 leading-relaxed">{stage.description}</p>
        
        {stage.canReject && (
          <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
            <p className="text-yellow-200 text-sm font-medium">
              ⚠️ This stage can reject the request, stopping the workflow
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
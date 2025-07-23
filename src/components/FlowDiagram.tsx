import React from 'react';
import { ArrowRight, ArrowDown, GitBranch, CheckCircle, Clock, XCircle, Users, Building2, UserCheck, Shield, Loader2, ThumbsUp } from 'lucide-react';
import { ApprovalStatus, Stage } from '../App';

interface FlowDiagramProps {
  stages: Stage[];
  statuses: ApprovalStatus[];
  currentStage: number;
}

export function FlowDiagram({ stages, statuses, currentStage }: FlowDiagramProps) {
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
        return ThumbsUp;
      case 'rejected':
        return XCircle;
      case 'pending':
        return Loader2;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Complete Approval Flow Sequence
      </h2>
      
      {/* Vertical Flow Chart */}
      <div className="max-w-4xl mx-auto">
        {stages.map((stage, index) => {
          const StageIcon = getStageIcon(stage.id);
          const StatusIcon = getStatusIcon(statuses[index]);
          
          return (
            <div key={stage.id} className="relative">
              {/* Main Stage Container */}
              <div className={`flex items-center space-x-8 p-6 rounded-2xl transition-all duration-1000 ${
                statuses[index] === 'approved'
                    ? 'text-green-400'
                  : statuses[index] === 'pending'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg shadow-yellow-500/30 scale-110 ring-4 ring-yellow-300/50 animate-pulse'
                  : statuses[index] === 'rejected'
                  ? 'bg-red-500/20 border-2 border-red-400/50 shadow-lg shadow-red-500/20'
                  : 'bg-white/5 border-2 border-white/10'
              }`}>
                
                {/* Stage Number Circle */}
                <div className={`relative flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-1000 ${
                  statuses[index] === 'approved'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-110'
                    : statuses[index] === 'pending'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg shadow-yellow-500/30 scale-110 ring-4 ring-yellow-300/50 animate-pulse'
                    : statuses[index] === 'rejected'
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white/70'
                }`}>
                  {index + 1}
                  
                  {/* Status Badge */}
                  {statuses[index] !== 'inactive' && (
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700 ${
                      statuses[index] === 'approved'
                        ? 'bg-green-400'
                        : statuses[index] === 'pending'
                        ? 'bg-yellow-400 animate-pulse'
                        : 'bg-red-400 animate-pulse'
                    }`}>
                      <StatusIcon className={`w-4 h-4 text-white ${
                        statuses[index] === 'pending' ? 'animate-spin' : ''
                      }`} />
                    </div>
                  )}
                </div>

                {/* Stage Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg transition-all duration-700 ${
                      statuses[index] === 'approved'
                        ? 'bg-green-500/30'
                        : statuses[index] === 'pending'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg shadow-yellow-500/30 scale-110 ring-4 ring-yellow-300/50 animate-pulse'
                        : statuses[index] === 'rejected'
                        ? 'bg-red-500/30'
                        : 'bg-gray-500/30'
                    }`}>
                      <StageIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                    
                    {stage.isParallel && (
                      <div className="flex items-center space-x-2 bg-purple-500/30 px-3 py-1 rounded-full border border-purple-400/30">
                        <GitBranch className="w-4 h-4 text-purple-300" />
                        <span className="text-sm text-purple-200 font-medium">Parallel Approval</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-white/80 mb-4">{stage.description}</p>
                  
                  {/* Users in this stage */}
                  <div className={`grid gap-3 ${stage.isParallel ? 'md:grid-cols-3' : 'md:grid-cols-1'}`}>
                    {stage.users.map((user, userIndex) => (
                      <div
                        key={user.id}
                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-1000 ${
                          statuses[index] === 'approved'
                            ? 'bg-green-500/20 border border-green-400/30'
                            : statuses[index] === 'pending'
                            ? 'bg-yellow-500/20 border border-yellow-400/30'
                            : statuses[index] === 'rejected'
                            ? 'bg-red-500/20 border border-red-400/30'
                            : 'bg-white/10 border border-white/20'
                        }`}
                        style={{
                          animationDelay: `${userIndex * 300}ms`
                        }}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-white text-sm">{user.name}</p>
                          <p className="text-xs text-white/70">{user.role}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full transition-all duration-700 ${
                          statuses[index] === 'approved'
                            ? 'bg-green-400 shadow-lg shadow-green-400/50'
                            : statuses[index] === 'pending'
                            ? 'bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50'
                            : statuses[index] === 'rejected'
                            ? 'bg-red-400 shadow-lg shadow-red-400/50'
                            : 'bg-gray-400'
                        }`} />
                      </div>
                    ))}
                  </div>
                  
                  {stage.canReject && (
                    <div className="mt-3 p-3 bg-orange-500/20 border border-orange-400/30 rounded-lg">
                      <p className="text-orange-200 text-sm font-medium flex items-center">
                        <XCircle className="w-4 h-4 mr-2" />
                        Can reject and stop the workflow
                      </p>
                    </div>
                  )}
                </div>

                {/* Status Indicator */}
                <div className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-700 ${
                  statuses[index] === 'approved'
                    ? 'bg-green-500 text-white shadow-lg'
                    : statuses[index] === 'pending'
                    ? 'bg-yellow-500 text-white shadow-lg animate-pulse'
                    : statuses[index] === 'rejected'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-gray-500 text-white/70'
                }`}>
                  {statuses[index] === 'inactive' ? 'Waiting' : statuses[index].charAt(0).toUpperCase() + statuses[index].slice(1)}
                </div>
              </div>

              {/* Connecting Arrow */}
              {index < stages.length - 1 && (
                <div className="flex justify-center my-6">
                  <div className={`transition-all duration-1000 ${
                    statuses[index] === 'approved'
                      ? 'text-green-400'
                      : statuses[index] === 'pending' && index === currentStage
                      ? 'text-yellow-400 animate-pulse'
                      : statuses[index] === 'rejected'
                      ? 'text-red-400'
                      : 'text-gray-500'
                  }`}>
                    <div className="flex flex-col items-center">
                      <ArrowDown className="w-8 h-8" />
                      <div className={`w-1 h-8 transition-all duration-1000 ${
                        statuses[index] === 'approved'
                          ? 'bg-green-400'
                          : statuses[index] === 'pending' && index === currentStage
                          ? 'bg-yellow-400'
                          : 'bg-gray-500'
                      }`} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Overall Progress */}
      <div className="mt-12 bg-white/10 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Overall Progress</h3>
          <span className="text-2xl font-bold text-white">
            {statuses.filter(s => s === 'approved').length}/{stages.length}
          </span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-2000 ease-out ${
              statuses.includes('rejected')
                ? 'bg-gradient-to-r from-red-400 to-red-600'
                : statuses.every(s => s === 'approved')
                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                : 'bg-gradient-to-r from-yellow-400 to-orange-500'
            }`}
            style={{
              width: `${((statuses.filter(s => s === 'approved').length) / stages.length) * 100}%`
            }}
          />
        </div>
        
        <div className="mt-3 text-center text-white/60 text-sm">
          {statuses.every(s => s === 'approved') 
            ? 'Workflow completed successfully!'
            : statuses.includes('rejected')
            ? 'Workflow rejected - cannot proceed'
            : `Currently processing Stage ${currentStage + 1} of ${stages.length}: ${stages[currentStage]?.title}`
          }
        </div>
      </div>
    </div>
  );
}
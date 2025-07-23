import React from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle, ThumbsUp, Loader2, Play } from 'lucide-react';
import { ApprovalStatus, Stage, ScenarioPath } from '../App';

interface StatusIndicatorProps {
  stages: Stage[];
  statuses: ApprovalStatus[];
  currentStage: number;
  selectedScenario?: ScenarioPath;
}

export function StatusIndicator({ stages, statuses, currentStage, selectedScenario }: StatusIndicatorProps) {
  const getOverallStatus = () => {
    if (statuses.includes('rejected')) return 'rejected';
    if (statuses.every(s => s === 'approved')) return 'completed';
    if (statuses.includes('pending')) return 'in-progress';
    return 'not-started';
  };

  const overallStatus = getOverallStatus();
  const completedStages = statuses.filter(s => s === 'approved').length;

  const getStatusConfig = () => {
    switch (overallStatus) {
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'from-green-500 to-emerald-600',
          text: 'Workflow Completed',
          description: 'All stages have been successfully approved'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'from-red-500 to-rose-600',
          text: 'Workflow Rejected',
          description: selectedScenario?.rejectedBy 
            ? `Rejected by ${selectedScenario.rejectedBy} at ${selectedScenario.rejectedAt}`
            : 'Request was rejected and cannot proceed'
        };
      case 'in-progress':
        return {
          icon: Loader2,
          color: 'from-yellow-500 to-orange-600',
          text: 'Workflow In Progress',
          description: `Currently processing Stage ${currentStage + 1} of ${stages.length}: ${stages[currentStage]?.title}`
        };
      default:
        return {
          icon: Play,
          color: 'from-gray-500 to-slate-600',
          text: 'Workflow Not Started',
          description: selectedScenario 
            ? `Selected scenario: ${selectedScenario.title}`
            : 'Select a scenario and click simulate to begin'
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;
  
  const getProgressIcon = () => {
    switch (overallStatus) {
      case 'completed':
        return ThumbsUp;
      case 'rejected':
        return XCircle;
      case 'in-progress':
        return Loader2;
      default:
        return Clock;
    }
  };
  
  const ProgressIcon = getProgressIcon();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-xl bg-gradient-to-r ${config.color} shadow-lg ${
            overallStatus === 'in-progress' ? 'animate-pulse' : ''
          }`}>
            <StatusIcon className={`w-8 h-8 text-white ${
              overallStatus === 'in-progress' ? 'animate-spin' : ''
            }`} />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white">{config.text}</h3>
            <p className="text-white/80">{config.description}</p>
            {selectedScenario && (
              <p className="text-white/60 text-sm mt-1">
                Scenario: {selectedScenario.title}
              </p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <ProgressIcon className={`w-6 h-6 ${
              overallStatus === 'completed' ? 'text-green-400' :
              overallStatus === 'rejected' ? 'text-red-400' :
              overallStatus === 'in-progress' ? 'text-yellow-400 animate-bounce' :
              'text-gray-400'
            }`} />
            <div className="text-3xl font-bold text-white">
              {completedStages}/{stages.length}
            </div>
          </div>
          <div className="text-white/60 text-sm">Stages Completed</div>
          {overallStatus === 'in-progress' && (
            <div className="text-yellow-300 text-xs mt-1">
              Step {currentStage + 1} Active
            </div>
          )}
        </div>
      </div>
      
      {/* Current Step Indicator - Fixed Position */}
      {overallStatus === 'in-progress' && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-500/90 backdrop-blur-md text-white px-6 py-3 rounded-xl shadow-lg border border-yellow-400/50">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <div>
              <div className="font-bold text-lg">Step {currentStage + 1} of {stages.length}</div>
              <div className="text-sm text-yellow-100">{stages[currentStage]?.title}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mini Progress Pills */}
      <div className="mt-6 flex space-x-2">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className={`flex-1 h-3 rounded-full transition-all duration-1500 relative ${
              statuses[index] === 'approved'
                ? 'bg-green-400 shadow-lg shadow-green-400/50'
                : statuses[index] === 'pending'
                ? 'bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50'
                : statuses[index] === 'rejected'
                ? 'bg-red-400 shadow-lg shadow-red-400/50'
                : 'bg-white/20'
            }`}
          >
            {statuses[index] === 'pending' && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                Step {index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
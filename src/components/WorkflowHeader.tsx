import React from 'react';
import { Play, RotateCcw, Users, Shield } from 'lucide-react';

interface WorkflowHeaderProps {
  onSimulate: () => void;
  onReset: () => void;
  isSimulating: boolean;
}

export function WorkflowHeader({ onSimulate, onReset, isSimulating }: WorkflowHeaderProps) {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Panda Cube</h1>
              <p className="text-white/80 text-lg">User Approval Workflow</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={onSimulate}
              disabled={isSimulating}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Play className="w-5 h-5" />
              <span>{isSimulating ? 'Simulating...' : 'Simulate Workflow'}</span>
            </button>
            
            <button
              onClick={onReset}
              disabled={isSimulating}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex items-center space-x-6 text-white/80">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Multi-Stage Approval Process</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-white/40 rounded-full"></div>
          <span className="hidden md:inline">4 Sequential Stages</span>
          <div className="hidden md:block w-1 h-1 bg-white/40 rounded-full"></div>
          <span className="hidden md:inline">Parallel Approval Support</span>
        </div>
      </div>
    </header>
  );
}
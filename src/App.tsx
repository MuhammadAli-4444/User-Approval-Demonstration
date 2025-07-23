import React, { useState, useEffect } from 'react';
import { WorkflowHeader } from './components/WorkflowHeader';
import { StageCard } from './components/StageCard';
import { UserCard } from './components/UserCard';
import { FlowDiagram } from './components/FlowDiagram';
import { StatusIndicator } from './components/StatusIndicator';
import { AnimatedBackground } from './components/AnimatedBackground';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'inactive';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
}

export interface Stage {
  id: string;
  title: string;
  description: string;
  status: ApprovalStatus;
  users: User[];
  isParallel?: boolean;
  canReject?: boolean;
}

export interface ScenarioPath {
  id: string;
  title: string;
  description: string;
  outcome: 'success' | 'rejection';
  rejectedBy?: string;
  rejectedAt?: string;
}
function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('success');

  const stages: Stage[] = [
    {
      id: 'partner-creation',
      title: 'Partner User Creation',
      description: 'KAM user creates a new partner user in the system',
      status: 'pending',
      users: [
        {
          id: 'kam-1',
          name: 'Fatima Al-Zahra',
          role: 'KAM User',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          department: 'Key Account Management'
        }
      ],
      canReject: false
    },
    {
      id: 'commercial-approval',
      title: 'Commercial Approval',
      description: 'Commercial Panda user reviews and approves/rejects the request',
      status: 'inactive',
      users: [
        {
          id: 'commercial-1',
          name: 'Ahmed Hassan',
          role: 'Commercial Panda User',
          avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          department: 'Commercial Operations'
        }
      ],
      canReject: true
    },
    {
      id: 'parallel-approval',
      title: 'Parallel Approval Stage',
      description: 'All three reviewers must approve for the request to proceed',
      status: 'inactive',
      isParallel: true,
      users: [
        {
          id: 'fusion-1',
          name: 'Dr. Aisha Rahman',
          role: 'Fusion Parallel',
          avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          department: 'Fusion Security'
        },
        {
          id: 'cyber-1',
          name: 'Omar Malik',
          role: 'Cyber Parallel',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          department: 'Cyber Security'
        },
        {
          id: 'cyber-2',
          name: 'Zara Ibrahim',
          role: 'Cyber Parallel',
          avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          department: 'Cyber Security'
        }
      ],
      canReject: true
    },
    {
      id: 'ready-activation',
      title: 'Ready for Activation',
      description: 'Cyber Security user activates the approved user',
      status: 'inactive',
      users: [
        {
          id: 'cyber-activation',
          name: 'Omar Malik',
          role: 'Cyber Security (Activation)',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          department: 'Cyber Security'
        }
      ],
      canReject: false
    }
  ];

  const scenarios: ScenarioPath[] = [
    {
      id: 'success',
      title: 'Complete Success Path',
      description: 'All stages approve and user is successfully activated',
      outcome: 'success'
    },
    {
      id: 'commercial-reject',
      title: 'Commercial Rejection',
      description: 'Commercial Panda user rejects the request',
      outcome: 'rejection',
      rejectedBy: 'Ahmed Hassan',
      rejectedAt: 'Commercial Approval'
    },
    {
      id: 'fusion-reject',
      title: 'Fusion Rejection',
      description: 'Fusion Parallel reviewer rejects the request',
      outcome: 'rejection',
      rejectedBy: 'Dr. Aisha Rahman',
      rejectedAt: 'Parallel Approval'
    },
    {
      id: 'cyber1-reject',
      title: 'Cyber Security Rejection (Omar)',
      description: 'Omar Malik rejects in parallel approval stage',
      outcome: 'rejection',
      rejectedBy: 'Omar Malik',
      rejectedAt: 'Parallel Approval'
    },
    {
      id: 'cyber2-reject',
      title: 'Cyber Security Rejection (Zara)',
      description: 'Zara Ibrahim rejects in parallel approval stage',
      outcome: 'rejection',
      rejectedBy: 'Zara Ibrahim',
      rejectedAt: 'Parallel Approval'
    }
  ];
  const [stageStatuses, setStageStatuses] = useState<ApprovalStatus[]>(
    stages.map((_, index) => index === 0 ? 'pending' : 'inactive')
  );

  const simulateWorkflow = async (scenarioId: string = 'success') => {
    setIsSimulating(true);
    setCurrentStage(0);
    setSelectedScenario(scenarioId);
    setStageStatuses(stages.map((_, index) => index === 0 ? 'pending' : 'inactive'));

    // Stage 1: Partner Creation
    await new Promise(resolve => setTimeout(resolve, 4000));
    setStageStatuses(prev => prev.map((status, index) => 
      index === 0 ? 'approved' : index === 1 ? 'pending' : status
    ));
    setCurrentStage(1);

    // Handle Commercial Rejection Scenario
    if (scenarioId === 'commercial-reject') {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setStageStatuses(prev => prev.map((status, index) => 
        index === 1 ? 'rejected' : status
      ));
      setIsSimulating(false);
      return;
    }
    // Stage 2: Commercial Approval
    await new Promise(resolve => setTimeout(resolve, 5000));
    setStageStatuses(prev => prev.map((status, index) => 
      index === 1 ? 'approved' : index === 2 ? 'pending' : status
    ));
    setCurrentStage(2);

    // Handle Parallel Rejection Scenarios
    if (['fusion-reject', 'cyber1-reject', 'cyber2-reject'].includes(scenarioId)) {
      await new Promise(resolve => setTimeout(resolve, 4000));
      setStageStatuses(prev => prev.map((status, index) => 
        index === 2 ? 'rejected' : status
      ));
      setIsSimulating(false);
      return;
    }
    // Stage 3: Parallel Approval
    await new Promise(resolve => setTimeout(resolve, 6000));
    setStageStatuses(prev => prev.map((status, index) => 
      index === 2 ? 'approved' : index === 3 ? 'pending' : status
    ));
    setCurrentStage(3);

    // Stage 4: Ready for Activation
    await new Promise(resolve => setTimeout(resolve, 4000));
    setStageStatuses(prev => prev.map((status, index) => 
      index === 3 ? 'approved' : status
    ));

    setIsSimulating(false);
  };

  const resetWorkflow = () => {
    setCurrentStage(0);
    setStageStatuses(stages.map((_, index) => index === 0 ? 'pending' : 'inactive'));
    setIsSimulating(false);
    setSelectedScenario('success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <WorkflowHeader 
          onSimulate={() => simulateWorkflow(selectedScenario)}
          onReset={resetWorkflow}
          isSimulating={isSimulating}
        />

        <div className="container mx-auto px-6 py-8">
          {isSimulating && (
            <div className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/30">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <div>
                  <div className="font-bold text-lg">Step {currentStage + 1} of {stages.length}</div>
                  <div className="text-sm text-white/80">{stages[currentStage]?.title}</div>
                </div>
              </div>
            </div>
          )}

          {/* Scenario Selection */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Select Scenario to Simulate</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                    disabled={isSimulating}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedScenario === scenario.id
                        ? scenario.outcome === 'success'
                          ? 'border-green-400 bg-green-500/20'
                          : 'border-red-400 bg-red-500/20'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    } ${isSimulating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                  >
                    <h4 className={`font-semibold text-sm mb-2 ${
                      scenario.outcome === 'success' ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {scenario.title}
                    </h4>
                    <p className="text-white/70 text-xs">{scenario.description}</p>
                    {scenario.rejectedBy && (
                      <p className="text-red-300 text-xs mt-2 font-medium">
                        Rejected by: {scenario.rejectedBy}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="mb-8">
            <FlowDiagram stages={stages} statuses={stageStatuses} currentStage={currentStage} />
          </div>

          {/* Workflow Legend */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Workflow Legend</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-white/80">Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white/80">Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-white/80">Rejected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-white/80">Inactive</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
              <h4 className="text-blue-200 font-medium mb-2">Key Rules:</h4>
              <ul className="text-blue-200/80 text-sm space-y-1">
                <li>• Commercial stage can reject and stop workflow</li>
                <li>• Parallel stage requires ALL three approvals to proceed</li>
                <li>• Same Cyber Security user handles both parallel approval and activation</li>
                <li>• Ready for Activation has no rejection option</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
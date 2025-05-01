
import React from 'react';
import { cn } from '@/lib/utils';
import { TournamentPhase } from './types';

interface PhaseTabsProps {
  phases: { id: TournamentPhase; label: string }[];
  selectedPhase: TournamentPhase;
  onPhaseChange: (phase: TournamentPhase) => void;
}

const PhaseTabs: React.FC<PhaseTabsProps> = ({ 
  phases,
  selectedPhase, 
  onPhaseChange 
}) => {

 
  return (
    <div className="bg-gray-900 text-white">
      <div className="flex overflow-x-auto">
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => onPhaseChange(phase.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap",
              selectedPhase === phase.id
                ? "bg-blue-900 text-white"
                : "text-gray-300 hover:bg-gray-800"
            )}
          >
            {phase.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhaseTabs;

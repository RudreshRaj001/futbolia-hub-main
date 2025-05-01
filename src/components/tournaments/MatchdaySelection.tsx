
import React from 'react';
import { cn } from '@/lib/utils';

interface MatchdaySelectionProps {
  matchdays: number[];
  selectedMatchday: number;
  onMatchdayChange: (matchday: number) => void;
}

const MatchdaySelection: React.FC<MatchdaySelectionProps> = ({ 
  matchdays,
  selectedMatchday, 
  onMatchdayChange 
}) => {
  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-100 dark:bg-gray-800 overflow-x-auto">
      {matchdays.map((matchday) => (
        <button
          key={matchday}
          onClick={() => onMatchdayChange(matchday)}
          className={cn(
            "min-w-[30px] h-8 text-xs font-medium rounded",
            selectedMatchday === matchday
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          )}
        >
          {matchday}
        </button>
      ))}
    </div>
  );
};

export default MatchdaySelection;

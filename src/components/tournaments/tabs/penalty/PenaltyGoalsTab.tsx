
import React from 'react';
import { PlayerDetails } from '../../mockTopScorersData';

interface PenaltyGoalsTabProps {
  player: PlayerDetails;
}

const PenaltyGoalsTab: React.FC<PenaltyGoalsTabProps> = ({ player }) => {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md inline-block mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{player.penaltyGoals}</div>
        <div className="text-gray-500 dark:text-gray-300">GOLES DE PENAL</div>
      </div>
    </div>
  );
};

export default PenaltyGoalsTab;

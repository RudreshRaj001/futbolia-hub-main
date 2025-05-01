
import React from 'react';
import { PlayerDetails } from '../../mockTopScorersData';

interface FreeKickGoalsTabProps {
  player: PlayerDetails;
}

const FreeKickGoalsTab: React.FC<FreeKickGoalsTabProps> = ({ player }) => {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md inline-block mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{player.freeKickGoals}</div>
        <div className="text-gray-500 dark:text-gray-300">GOLES DE TIRO LIBRE</div>
      </div>
    </div>
  );
};

export default FreeKickGoalsTab;
